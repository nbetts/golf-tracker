import { Header, Group, MediaQuery, Burger, Tooltip, ActionIcon, Text, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconBrandGithub, IconExternalLink } from '@tabler/icons';

type AppShellHeaderProps = {
  navMenuOpened: boolean;
  onNavMenuToggle: (navMenuOpened: boolean) => void;
};

const AppShellHeader = ({ navMenuOpened, onNavMenuToggle }: AppShellHeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header height={66} p="md">
      <Group sx={{ height: '100%' }} pl="md" position="apart">
        <Group spacing="sm">
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger opened={navMenuOpened} onClick={() => onNavMenuToggle(!navMenuOpened)} size="sm" mr="xs" />
          </MediaQuery>
          <Text size={20}>⛳️</Text>
          <Text component="span" align="center" variant="gradient" gradient={{ from: 'teal', to: 'green', deg: 45 }} size={22} weight="bold">
            Golf Tracker
          </Text>
        </Group>
        <Group spacing="xs">
          <Tooltip label={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}>
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={32} radius="md">
              {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>
          </Tooltip>
          <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
            <Tooltip
              label={
                <Group spacing={5}>
                  <Text>GitHub</Text>
                  <IconExternalLink size={12} />
                </Group>
              }
            >
              <ActionIcon variant="default" size={32} radius="md" component="a" href="https://github.com/nbetts/golf-tracker" target="_blank">
                <IconBrandGithub size={20} />
              </ActionIcon>
            </Tooltip>
          </MediaQuery>
        </Group>
      </Group>
    </Header>
  );
};

export default AppShellHeader;
