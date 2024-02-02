import {
  FormField as BaseFormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import { ComponentProps } from 'react';
import { FieldValues } from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = Omit<ComponentProps<typeof BaseFormField<T>>, 'render'> & {
  label?: string;
  placeholder?: string;
  description?: string;
  type?: InputProps['type'];
};

export default function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  return (
    <BaseFormField
      {...props}
      render={({ field }) => (
        <FormItem>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            {props.type === 'number' ? (
              <Input
                type={props.type}
                placeholder={props.placeholder}
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            ) : (
              <Input
                type={props.type}
                placeholder={props.placeholder}
                {...field}
              />
            )}
          </FormControl>
          {props.description && <FormDescription>{props.description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
