import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';
import { theme } from 'src/utils';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <NotificationsProvider>
            <ModalsProvider>
              <Head>
                <title>Golf Tracker</title>
                <meta name="description" content="Track your golf scorecards" />
                <meta name="application-name" content="Golf Tracker" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="Golf Tracker" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="theme-color" content="#69DB7C" />
                <link rel="apple-touch-icon" sizes="48x48" href="/assets/icons/icon-48x48.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/assets/icons/icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="96x96" href="/assets/icons/icon-96x96.png" />
                <link rel="apple-touch-icon" sizes="128x128" href="/assets/icons/icon-128x128.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/assets/icons/icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="192x192" href="/assets/icons/icon-192x192.png" />
                <link rel="apple-touch-icon" sizes="384x384" href="/assets/icons/icon-384x384.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/assets/icons/icon-512x512.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/icon-48x48.png" />
                <link rel="manifest" href="/manifest.json" />
              </Head>
              <Component {...pageProps} />
            </ModalsProvider>
          </NotificationsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
