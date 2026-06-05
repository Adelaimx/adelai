import { shopifyFetch } from '../index';
import { CustomerAccessToken } from '../types';

export async function createCustomerAccessToken(email: string, password: string): Promise<CustomerAccessToken> {
  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const res = await shopifyFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: { message: string }[];
    };
  }>({
    query,
    variables: { input: { email, password } },
    cache: 'no-store'
  });

  if (res.customerAccessTokenCreate.customerUserErrors.length > 0) {
    throw new Error(res.customerAccessTokenCreate.customerUserErrors[0].message);
  }

  if (!res.customerAccessTokenCreate.customerAccessToken) {
    throw new Error('No se pudo generar el token de acceso.');
  }

  return res.customerAccessTokenCreate.customerAccessToken;
}
