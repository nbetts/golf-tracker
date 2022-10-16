import { Navbar, NavLink, ThemeIcon } from '@mantine/core';
import { IconChevronRight, IconGolf, IconUsers, IconId } from '@tabler/icons';
import { Link } from 'react-router-dom';
import store from '../../src/utils/store';
import routes from '../../src/utils/routes';
import { UserSettings } from './UserSettings';

type AppShellNavbarProps = {
  navMenuOpened: boolean;
  onNavMenuToggle: (navMenuOpened: boolean) => void;
};

export default function AppShellNavbar(props: AppShellNavbarProps) {
  const user = store.useState((s) => s.user);

  return (
    <Navbar p="xs" hiddenBreakpoint="sm" hidden={!props.navMenuOpened} width={{ sm: 280 }}>
      <Navbar.Section grow mb="xs">
        {user && (
          <>
            <NavLink
              label="Courses"
              component={Link}
              to={routes.courses}
              onClick={() => props.onNavMenuToggle(false)}
              rightSection={<IconChevronRight size={12} />}
              icon={
                <ThemeIcon color="green" variant="light">
                  <IconGolf size={16} />
                </ThemeIcon>
              }
            />
            <NavLink
              label="Players"
              component={Link}
              to={routes.players}
              onClick={() => props.onNavMenuToggle(false)}
              rightSection={<IconChevronRight size={12} />}
              icon={
                <ThemeIcon color="pink" variant="light">
                  <IconUsers size={16} />
                </ThemeIcon>
              }
            />
            <NavLink
              label="Scorecards"
              component={Link}
              to={routes.scorecards}
              onClick={() => props.onNavMenuToggle(false)}
              rightSection={<IconChevronRight size={12} />}
              icon={
                <ThemeIcon color="cyan" variant="light">
                  <IconId size={16} />
                </ThemeIcon>
              }
            />
          </>
        )}
      </Navbar.Section>
      <Navbar.Section>
        <UserSettings />
      </Navbar.Section>
    </Navbar>
  );
}
