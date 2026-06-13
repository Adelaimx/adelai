'use server';

// Simple email regex for basic validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: string) {
  // Very basic HTML escaping to prevent XSS in email
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = formData;

  // 1. Validation Filters
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { error: 'El nombre es obligatorio.' };
  }
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return { error: 'El correo electrónico no es válido.' };
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return { error: 'El mensaje debe tener al menos 10 caracteres.' };
  }

  // 2. Sanitize Inputs
  const safeName = sanitize(name.trim());
  const safeEmail = email.trim();
  const safeMessage = sanitize(message.trim());

  try {
    const response = await fetch(`${process.env.RESEND_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Resend requires sending from a verified domain or 'onboarding@resend.dev' for testing
        from: `Adelai Contacto <${process.env.RESEND_FROM}>`,
        // Reemplaza esto con tu correo real donde quieres recibir los mensajes
        to: [`${process.env.RESEND_TO}`], // Cambiar al correo registrado en Resend
        subject: `Nuevo mensaje de contacto de ${safeName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${safeName}</p>
            <p><strong>Correo electrónico:</strong> ${safeEmail}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${safeMessage.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
        reply_to: safeEmail,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend error:', errorData);
      return { error: 'No se pudo enviar el correo', details: errorData };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Error interno del servidor' };
  }
}
