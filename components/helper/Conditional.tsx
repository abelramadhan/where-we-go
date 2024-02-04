import { PropsWithChildren } from 'react';

type ConditionalProps = PropsWithChildren & {
  condition: boolean;
};

export default function Conditional(props: ConditionalProps) {
  if (!props.condition) return null;
  return props.children;
}
