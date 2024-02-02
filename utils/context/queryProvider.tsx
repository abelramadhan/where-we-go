'use client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { PropsWithChildren } from 'react';
import { QueryClientProvider as BaseProvider, QueryCache, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

if (typeof window !== 'undefined') {
  const localStoragePersister = createSyncStoragePersister({
    storage: window?.localStorage,
  });
  persistQueryClient({ persister: localStoragePersister, queryClient: queryClient });
}

export default function QueryClientProvider(props: PropsWithChildren) {
  return <BaseProvider client={queryClient}>{props.children}</BaseProvider>;
}
