'use client';

import ResponsiveDialog from '@/components/ui/responsive-dialog';
import FormField from '../inputs/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tables } from '@/types/database.types';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSupabase } from '@/utils/context/supabaseContext';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import * as z from 'zod';
import { useLoading } from '@/utils/context/loadingContext';

const formSchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(2).max(50),
});

type GroupFormDialogProps = PropsWithChildren & {
  group?: Tables<'user_group'>;
  onSuccessSubmit?: (res: PostgrestSingleResponse<Tables<'user_group'>[]>) => void;
  onFailedSubmit?: (res: PostgrestSingleResponse<Tables<'user_group'>[]>) => void;
};

export default function GroupFormDialog(props: GroupFormDialogProps) {
  const { group } = props;

  const [open, setOpen] = useState(false);

  const { createGroup, updateGroup } = useSupabase();
  const { withLoading } = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { id: group?.id ?? null, name: group?.name ?? '' },
  });

  const title = group ? 'Edit Group' : 'Create new Group';
  const description = group
    ? "Make changes to your group here. Click save when you're done."
    : "Let's create a group! you can invite your friends afterwards";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return await withLoading(async () => {
      const res = await (values.id ? updateGroup({ id: values.id, name: values.name }) : createGroup(values));
      if (res.error) {
        props.onFailedSubmit && props.onFailedSubmit(res);
        return;
      }
      props.onSuccessSubmit && props.onSuccessSubmit(res);
      setOpen(false);
    });
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      trigger={props.children}
      title={title}
      description={description}
      content={
        <Form {...form}>
          <FormField
            control={form.control}
            name='name'
            label='Group Name'
            placeholder='My New Group'
          />
        </Form>
      }
      footer={
        <Button
          type='submit'
          onClick={form.handleSubmit(onSubmit)}>
          Create Group
        </Button>
      }
    />
  );
}
