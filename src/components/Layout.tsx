import { useMantineTheme, AppShell, LoadingOverlay } from '@mantine/core';
import { Unsubscribe } from 'firebase/firestore';
import { ReactNode, useEffect, useState } from 'react';
import {
  authStateChangedObserver,
  coursesSnapshotListener,
  playersSnapshotListener,
  scorecardsSnapshotListener,
} from '../../src/utils/firebase';
import store from '../../src/utils/store';
import AppShellHeader from './AppShellHeader';
import AppShellNavbar from './AppShellNavbar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const appLoaded = store.useState((s) => s.appLoaded);
  const user = store.useState((s) => s.user);
  const theme = useMantineTheme();
  const [navMenuOpened, setNavMenuOpened] = useState(false);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = authStateChangedObserver();

    return () => {
      unsubscribe();
    };
  }, []);

  // Golf courses collection listener
  useEffect(() => {
    let unsubscribeGolfCoursesSnapshotListener: Unsubscribe;
    let unsubscribeGolfPlayersSnapshotListener: Unsubscribe;
    let unsubscribeScorecardsSnapshotListener: Unsubscribe;

    if (appLoaded && user) {
      unsubscribeGolfCoursesSnapshotListener = coursesSnapshotListener();
      unsubscribeGolfPlayersSnapshotListener = playersSnapshotListener();
      unsubscribeScorecardsSnapshotListener = scorecardsSnapshotListener();
    }

    return () => {
      unsubscribeGolfCoursesSnapshotListener && unsubscribeGolfCoursesSnapshotListener();
      unsubscribeGolfPlayersSnapshotListener && unsubscribeGolfPlayersSnapshotListener();
      unsubscribeScorecardsSnapshotListener && unsubscribeScorecardsSnapshotListener();
    };
  }, [appLoaded, user]);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      padding="xl"
      navbarOffsetBreakpoint="sm"
      navbar={<AppShellNavbar navMenuOpened={navMenuOpened} onNavMenuToggle={setNavMenuOpened} />}
      header={<AppShellHeader navMenuOpened={navMenuOpened} onNavMenuToggle={setNavMenuOpened} />}
    >
      <LoadingOverlay visible={!appLoaded} overlayBlur={2} />
      {props.children}
    </AppShell>
  );
}
