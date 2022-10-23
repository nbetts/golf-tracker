import { Navbar, NavLink, ThemeIcon } from '@mantine/core';
import { IconChevronRight, IconGolf, IconUsers, IconId, IconUser } from '@tabler/icons';
import Link from 'next/link';
import routes from 'src/utils/routes';
import UserSettings from './UserSettings';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { useSignIn } from 'src/utils/firebase';

type AppShellNavbarProps = {
  navMenuOpened: boolean;
  onNavMenuToggle: (navMenuOpened: boolean) => void;
  user?: User;
};

const AppShellNavbar = ({ navMenuOpened, onNavMenuToggle, user }: AppShellNavbarProps) => {
  const signIn = useSignIn();

  return (
    <Navbar p="xs" hiddenBreakpoint="sm" hidden={!navMenuOpened} width={{ sm: 280 }}>
      <Navbar.Section grow mb="xs">
        {user ? (
          <>
            <Link href={routes.courses} passHref>
              <NavLink
                label="Courses"
                component="a"
                onClick={() => onNavMenuToggle(false)}
                rightSection={<IconChevronRight size={12} />}
                icon={
                  <ThemeIcon color="green" variant="light">
                    <IconGolf size={16} />
                  </ThemeIcon>
                }
              />
            </Link>
            <Link href={routes.players} passHref>
              <NavLink
                label="Players"
                component="a"
                onClick={() => onNavMenuToggle(false)}
                rightSection={<IconChevronRight size={12} />}
                icon={
                  <ThemeIcon color="pink" variant="light">
                    <IconUsers size={16} />
                  </ThemeIcon>
                }
              />
            </Link>
            <Link href={routes.scorecards} passHref>
              <NavLink
                label="Scorecards"
                component="a"
                onClick={() => onNavMenuToggle(false)}
                rightSection={<IconChevronRight size={12} />}
                icon={
                  <ThemeIcon color="cyan" variant="light">
                    <IconId size={16} />
                  </ThemeIcon>
                }
              />
            </Link>
          </>
        ) : (
          <NavLink
            label="Sign in"
            component="button"
            onClick={() => signIn.mutate({ provider: new GoogleAuthProvider() })}
            rightSection={<IconChevronRight size={12} />}
            icon={
              <ThemeIcon color="pink" variant="light">
                <IconUser size={16} />
              </ThemeIcon>
            }
          />
        )}
      </Navbar.Section>
      {user && (
        <Navbar.Section>
          <UserSettings user={user} />
        </Navbar.Section>
      )}
    </Navbar>
  );
};

export default AppShellNavbar;
