'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tables } from '@/types/database.types';
import { useSupabase } from '@/utils/context/supabaseContext';
import { useQuery } from '@tanstack/react-query';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { CopyIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type GroupInviteLinkProps = {
  group?: Tables<'user_group'>;
};

export default function GroupInviteLink(props: GroupInviteLinkProps) {
  const { group } = props;
  const { getGroupInvite, createGroupInvite } = useSupabase();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['invite', group?.id],
    queryFn: () => group && getGroupInvite(group.id),
  });

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const createInviteAndRefresh = async () => {
    try {
      if (!group) return;
      const res = await createGroupInvite(group?.id);
      if (res.error) return;
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!data || data.data?.invite_code) return;
    createInviteAndRefresh();
  }, [data]);

  useEffect(() => {
    if (!copiedText) return;
    toast.success('Text copied to clipboard');
  }, [copiedText]);

  const origin = window.location.origin;
  const link = `${origin}/join/${data?.data?.invite_code}`;

  if (isLoading) {
    return (
      <div className='relative'>
        <Input disabled></Input>
        <span className='absolute top-2 left-2 h-8 w-32 animate-pulse'></span>
      </div>
    );
  }

  return (
    <div className='relative'>
      <Input
        className='pr-12'
        disabled
        value={link}
      />
      <Button
        size={'icon'}
        variant={'secondary'}
        className='absolute top-0 right-0 p-2 w-auto h-full aspect-square rounded-l-none'
        onClick={() => copyToClipboard(link)}>
        <CopyIcon size={16} />
      </Button>
    </div>
  );
}
