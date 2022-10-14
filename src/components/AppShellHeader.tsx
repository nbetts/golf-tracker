import { Header, Group, MediaQuery, Burger, Tooltip, ActionIcon, Text, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';

type AppShellHeaderProps = {
  navMenuOpened: boolean;
  onNavMenuToggle: (navMenuOpened: boolean) => void;
};

export default function AppShellHeader(props: AppShellHeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={70} p="md">
      <Group sx={{ height: '100%' }} pl="md" position="apart">
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={props.navMenuOpened}
              onClick={() => props.onNavMenuToggle(!props.navMenuOpened)}
              size="sm"
              color="gray.6"
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
  );
}
