import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import Scorecards from './pages/Scorecards';
import Layout from './components/Layout';
import { useLocalStorage } from '@mantine/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from './pages/Courses';
import Players from './pages/Players';
import routes from './utils/routes';

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
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={routes.courses} element={<Courses />} />
              <Route path={routes.players} element={<Players />} />
              <Route path={routes.scorecards} element={<Scorecards />} />
              <Route path={routes.home} element={<p>Home</p>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
