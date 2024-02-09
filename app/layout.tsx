import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { SupabaseProvider } from '@/utils/context/supabaseContext';
import { LoadingProvider } from '@/utils/context/loadingContext';
import QueryClientProvider from '@/utils/context/queryProvider';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Where We Go',
  description: 'The fastest way to build apps with Next.js and Supabase',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <SupabaseProvider>
        <html
          lang='en'
          className={GeistSans.className}>
          <body className='bg-background text-foreground'>
            <NextTopLoader color='#facc15' />
            <main className='flex min-h-[100dvh] flex-col items-center'>
              <LoadingProvider>{children}</LoadingProvider>
              <Toaster />
            </main>
          </body>
        </html>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}
