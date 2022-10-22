import { useMantineTheme, AppShell, LoadingOverlay, Stack } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { useFirebaseAuthUser } from 'src/utils/firebase';
import AppShellHeader from './AppShellHeader';
import AppShellNavbar from './AppShellNavbar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const user = useFirebaseAuthUser();
  const theme = useMantineTheme();
  const [navMenuOpened, setNavMenuOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      padding="xl"
      navbarOffsetBreakpoint="sm"
      navbar={<AppShellNavbar navMenuOpened={navMenuOpened} onNavMenuToggle={setNavMenuOpened} user={user.data} />}
      header={<AppShellHeader navMenuOpened={navMenuOpened} onNavMenuToggle={setNavMenuOpened} />}
    >
      <LoadingOverlay visible={user.isLoading} overlayBlur={2} />
      <Stack>{children}</Stack>
    </AppShell>
  );
};

export default Layout;
