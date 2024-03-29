import { Avatar, Box, Navbar, NavLink, ThemeIcon } from '@mantine/core';
import { IconChevronRight, IconGolf, IconUsers, IconId } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { routes, openAccountSettingsModal } from 'src/utils';

type AppShellNavbarProps = {
  navMenuOpened: boolean;
  onNavMenuToggle: (navMenuOpened: boolean) => void;
  user?: User;
};

export const AppShellNavbar = ({ navMenuOpened, onNavMenuToggle, user }: AppShellNavbarProps) => {
  return (
    <Navbar p="xs" hiddenBreakpoint="sm" hidden={!navMenuOpened} width={{ sm: 280 }}>
      <Navbar.Section grow mb="xs">
        <NavLink
          label="Courses"
          component={Link}
          to={routes.courses}
          onClick={() => onNavMenuToggle(false)}
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
          onClick={() => onNavMenuToggle(false)}
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
          onClick={() => onNavMenuToggle(false)}
          rightSection={<IconChevronRight size={12} />}
          icon={
            <ThemeIcon color="cyan" variant="light">
              <IconId size={16} />
            </ThemeIcon>
          }
        />
      </Navbar.Section>
      {user && (
        <Navbar.Section>
          <Box
            pt="xs"
            sx={(theme) => ({
              borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
            })}
          >
            <NavLink
              label={user.displayName}
              description={user.email}
              icon={<Avatar color="pink" radius="xl" src={user.photoURL} />}
              onClick={() => openAccountSettingsModal()}
            />
          </Box>
        </Navbar.Section>
      )}
    </Navbar>
  );
};
