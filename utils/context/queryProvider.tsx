'use client';

import { PropsWithChildren } from 'react';
import { QueryClientProvider as BaseProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export default function QueryClientProvider(props: PropsWithChildren) {
  return <BaseProvider client={queryClient}>{props.children}</BaseProvider>;
}
