import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Scorecards from './components/Scorecards';
import Layout from './components/Layout';
import { useLocalStorage } from '@mantine/hooks';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Layout>
          <Scorecards />
        </Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
