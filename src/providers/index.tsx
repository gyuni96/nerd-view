'use client';

import { QueryProvider } from './query-provider';
import { ZustandProvider } from './zustand-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ZustandProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ZustandProvider>
  );
}
