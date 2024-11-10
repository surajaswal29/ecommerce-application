import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

import { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Green App - Your Marketplace for Plants, Seeds & Tools',
  description: 'Shop plants, seeds, and essential farming tools online with Green App for a sustainable future.',
};

const FAVICON_URL = process.env.FAVICON_URL;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="icon" href={FAVICON_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
