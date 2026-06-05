'use server';

import { cookies } from 'next/headers';
import { createCustomerAccessToken } from '../../lib/shopify/mutations/auth';
import { getCustomer } from '../../lib/shopify/queries/customer';

const TOKEN_COOKIE_NAME = 'customerAccessToken';

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, introduce tu email y contraseña.' };
  }

  try {
    const token = await createCustomerAccessToken(email, password);
    
    // Almacenar el token de forma segura
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_COOKIE_NAME, token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(token.expiresAt)
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Error al iniciar sesión. Comprueba tus credenciales.' };
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return getCustomer(token);
}
