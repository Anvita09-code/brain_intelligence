import { redirect } from 'next/navigation';

/**
 * Root gateway – redirects to the enterprise operations hub.
 */
export default async function IndexGatewayPage() {
  redirect('/dashboard');
}
