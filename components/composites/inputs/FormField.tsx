import {
  FormField as BaseFormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ComponentProps } from 'react';
import { FieldValues } from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = Omit<ComponentProps<typeof BaseFormField<T>>, 'render'> & {
  label?: string;
  placeholder?: string;
  description?: string;
};

export default function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  return (
    <BaseFormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
            />
          </FormControl>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
