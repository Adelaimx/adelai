import { shopifyFetch } from '../index';
import { Customer } from '../types';

export async function getCustomer(customerAccessToken: string): Promise<Customer | null> {
  const query = `
    query getCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `;

  try {
    const res = await shopifyFetch<{ customer: Customer }>({
      query,
      variables: { customerAccessToken },
      cache: 'no-store'
    });

    return res.customer;
  } catch (error) {
    console.error('Error fetching customer:', error);
    return null;
  }
}
