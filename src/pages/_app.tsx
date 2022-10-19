import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'green' }} withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <NotificationsProvider>
            <ModalsProvider>
              <Head>
                <title>Golf Tracker</title>
                <meta name="description" content="Track your golf scorecards with friends" />
                <link rel="icon" href="/favicon.svg" />
              </Head>
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
