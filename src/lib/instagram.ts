export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

export async function getInstagramPosts(limit = 15): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  
  if (!token || !accountId) {
    console.warn('INSTAGRAM_ACCESS_TOKEN o INSTAGRAM_ACCOUNT_ID no están configurados. Retornando array vacío.');
    return [];
  }

  try {
    // Usando la API Graph oficial (v19.0)
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}&limit=${limit}`,
      { next: { revalidate: 3600 } } // Revalidar caché cada hora para no exceder límites de API
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Instagram API Error:', errorData);
      throw new Error(`Failed to fetch Instagram posts: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data as InstagramPost[];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}
