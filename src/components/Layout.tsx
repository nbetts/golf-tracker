import {
  useMantineTheme,
  AppShell,
  Navbar,
  MediaQuery,
  Header,
  Burger,
  Text,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Tooltip,
  NavLink,
  ThemeIcon,
} from '@mantine/core';
import { IconChevronRight, IconGolf, IconId, IconMoon, IconSun, IconUsers } from '@tabler/icons';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../src/utils/routes';
import { UserSettings } from './UserSettings';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      padding="xl"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 280 }}>
          <Navbar.Section grow mb="xs">
            <NavLink
              label="Courses"
              component={Link}
              to={routes.courses}
              onClick={() => setOpened(false)}
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
              onClick={() => setOpened(false)}
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
              onClick={() => setOpened(false)}
              rightSection={<IconChevronRight size={12} />}
              icon={
                <ThemeIcon color="cyan" variant="light">
                  <IconId size={16} />
                </ThemeIcon>
              }
            />
          </Navbar.Section>
          <Navbar.Section>
            <UserSettings />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <Group sx={{ height: '100%' }} pl="md" position="apart">
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xs"
                />
              </MediaQuery>
              <Text size={22}>⛳️</Text>
              <Text
                component="span"
                align="center"
                variant="gradient"
                gradient={{ from: 'teal', to: 'green', deg: 45 }}
                size={22}
                ml="xs"
                weight="bold"
              >
                Golf Tracker
              </Text>
            </Group>
            <Tooltip label={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}>
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={32} radius="md">
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
}
