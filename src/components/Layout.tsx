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
} from '@mantine/core';
import { IconGolf, IconId, IconMoon, IconSun, IconUsers } from '@tabler/icons';
import { ReactNode, useState } from 'react';
import MainLink from './MainLink';
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
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="xs" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 280 }}>
          <Navbar.Section grow mb="xs">
            <MainLink label="Scorecards" icon={<IconId size={16} />} color="blue" />
            <MainLink label="Players" icon={<IconUsers size={16} />} color="pink" />
            <MainLink label="Courses" icon={<IconGolf size={16} />} color="green" />
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
              <Text size="xl">⛳️</Text>
              <Text weight="bold">Golf Tracker</Text>
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
