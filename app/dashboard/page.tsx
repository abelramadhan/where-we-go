import parseNameFromEmail from '@/utils/helper/parseNameFromEmail';
import { useServerClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const supabase = useServerClient();
  const user = await supabase.auth.getUser();
  return (
    <div className='space-y-4'>
      <div>
        <h4 className='text-lg font-medium'>Hello, {parseNameFromEmail(user.data.user?.email)}</h4>
        <p className='text-gray-400 font-light text-sm'>Welcome back! Here are your destination wishlist</p>
      </div>
    </div>
  );
}
