import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';
import '@sammy-labs/walkthroughs/dist/index.css';

import dynamic from 'next/dynamic';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

// Import walkthrough dynamically with SSR disabled
const WalkthroughButtonWithProvider = dynamic(
  () => import('@/components/core/walkthrough-button').then((mod) => mod.WalkthroughButtonWithProvider),
  { ssr: false }
);

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>
              <WalkthroughButtonWithProvider />
              {children}
            </ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
