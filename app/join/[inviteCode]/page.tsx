import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

const DASHBOARD_ROUTE = '/dashboard';

export default async function JoinPage({ params }: { params: { inviteCode: string } }) {
  const { inviteCode } = params;

  const NotFoundCard = (
    <div className='h-[100dvh] flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Oops!</CardTitle>
          <CardDescription>Sorry, we did not found the group you&apos;re looking for</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={DASHBOARD_ROUTE}>
            <Button>Back to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );

  const FailedCard = (
    <div className='h-[100dvh] flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Oops!</CardTitle>
          <CardDescription>Sorry, we are having problems right now</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={DASHBOARD_ROUTE}>
            <Button>Back to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );

  const SuccessCard = (
    <div className='h-[100dvh] flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Success!</CardTitle>
          <CardDescription>You have successfully joined a group</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={DASHBOARD_ROUTE}>
            <Button>Continue to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );

  if (!inviteCode) return NotFoundCard;

  const cookie = cookies();
  const supabase = createClient(cookie);

  const groupInviteRes = await supabase.from('user_group_invite').select().eq('invite_code', inviteCode).single();
  const groupId = groupInviteRes.data?.group_id;

  if (!groupId) return NotFoundCard;

  const userId = (await supabase.auth.getUser()).data.user?.id;

  if (!userId) return FailedCard;

  const relationRes = await supabase
    .from('user_group_relation')
    .select('*')
    .eq('group_id', groupId)
    .eq('user_id', userId)
    .single();
  const isMember = relationRes.data ? true : false;

  if (isMember) return SuccessCard;

  const joinRes = await supabase.from('user_group_relation').insert({ group_id: groupId });

  if (joinRes.error) return FailedCard;

  return SuccessCard;
}
