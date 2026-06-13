import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { revalidateTag } from 'next/cache';

export async function GET(req: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET;
  const url = new URL(req.url);
  const querySecret = url.searchParams.get('secret');

  if (querySecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized manual revalidation' }, { status: 401 });
  }

  const tag = url.searchParams.get('tag') || 'products';
  revalidateTag(tag, 'max');
  
  return NextResponse.json({ success: true, message: `Revalidated tag: ${tag}` });
}

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as text for HMAC validation
    const rawBody = await req.text();
    
    // Get headers
    const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256');
    const topic = req.headers.get('X-Shopify-Topic');
    const shop = req.headers.get('X-Shopify-Shop-Domain');

    // 1. Check if headers exist
    if (!hmacHeader || !topic || !shop) {
      return NextResponse.json({ error: 'Missing Shopify headers' }, { status: 400 });
    }

    // 2. Validate HMAC Signature
    const secret = process.env.WEBHOOK_SECRET;
    if (!secret) {
      console.error('Missing WEBHOOK_SECRET in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const generatedHash = crypto
      .createHmac('sha256', secret)
      .update(rawBody, 'utf8')
      .digest('base64');

    // Secure compare to prevent timing attacks
    // We must ensure both strings are of equal length before using timingSafeEqual
    let isValid = false;
    try {
      const generatedBuffer = Buffer.from(generatedHash);
      const headerBuffer = Buffer.from(hmacHeader);
      if (generatedBuffer.length === headerBuffer.length) {
        isValid = crypto.timingSafeEqual(generatedBuffer, headerBuffer);
      }
    } catch (e) {
      isValid = false;
    }

    if (!isValid) {
      console.error('Invalid Webhook Signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Process the Webhook Topic
    console.log(`Received verified webhook: ${topic} from ${shop}`);

    switch (topic) {
      case 'products/create':
      case 'products/update':
      case 'products/delete':
        // Purgar caché de productos
        revalidateTag('products', 'max');
        console.log('Revalidated cache tag: products');
        break;

      case 'collections/create':
      case 'collections/update':
      case 'collections/delete':
        // Purgar caché de colecciones y productos (ya que las colecciones contienen productos)
        revalidateTag('collections', 'max');
        revalidateTag('products', 'max');
        console.log('Revalidated cache tags: collections, products');
        break;

      case 'inventory_levels/update':
        // Cuando cambia el stock por una compra, revalidamos productos
        revalidateTag('products', 'max');
        console.log('Revalidated cache tag: products (Inventory updated)');
        break;

      default:
        console.log(`Unhandled topic: ${topic}`);
    }

    // Shopify requires a 200 response to acknowledge receipt
    return NextResponse.json({ success: true, message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
