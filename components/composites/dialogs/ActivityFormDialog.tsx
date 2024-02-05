'use client';

import ResponsiveDialog from '@/components/ui/responsive-dialog';
import FormField from '../inputs/FormField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tables, TablesUpdate } from '@/types/database.types';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabase } from '@/utils/context/supabaseContext';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import * as z from 'zod';
import { useLoading } from '@/utils/context/loadingContext';

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(2).max(20),
  description: z.string().max(50).nullable().optional(),
  budget: z.number().nullable().optional(),
  planned_date: z.string().nullable().optional(),
});

type ActivityFormDialogProps = PropsWithChildren & {
  activity?: Tables<'activity'>;
  group: Tables<'user_group'>;
  onSuccessSubmit?: (res: PostgrestSingleResponse<Tables<'activity'>[]>) => void;
  onFailedSubmit?: (res: PostgrestSingleResponse<Tables<'activity'>[]>) => void;
};

export default function ActivityFormDialog(props: ActivityFormDialogProps) {
  const { activity } = props;

  const [open, setOpen] = useState(false);

  const { createActivity, updateActivity } = useSupabase();
  const { withLoading } = useLoading();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: activity,
    resolver: zodResolver(formSchema),
  });

  const title = activity ? 'Edit Activity' : 'Create new Activity';
  const description = activity
    ? "Make changes to your Activity here. Click save when you're done."
    : `Let's create an Activity for ${props.group.name}`;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    return await withLoading(async () => {
      const res = await (values.id ? updateActivity(values) : createActivity(values, props.group.id));
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
          <div className='space-y-3'>
            <FormField
              control={form.control}
              name='title'
              label='Activity Title'
              placeholder='My New activity'
            />
            <FormField
              control={form.control}
              name='description'
              label='Activity Description'
              placeholder='Very fun activity!'
            />
            <FormField
              control={form.control}
              name='budget'
              type='number'
              label='Budget Estimate'
              placeholder='10000'
            />
            <FormField
              control={form.control}
              name='planned_date'
              type='date'
              label='Planned Date'
              placeholder='DD/MM/YYYY'
            />
          </div>
        </Form>
      }
      footer={
        <Button
          type='submit'
          onClick={form.handleSubmit(onSubmit)}>
          {props.activity ? 'Save Changes' : 'Create Activity'}
        </Button>
      }
    />
  );
}
