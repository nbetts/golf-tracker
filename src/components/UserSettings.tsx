import { IconChevronRight, IconUserCircle } from '@tabler/icons';
import { Box, ThemeIcon, NavLink, Popover, Button } from '@mantine/core';
import store from '../../src/utils/store';

export function UserSettings() {
  const user = store.useState((s) => s.user);

  if (!user) {
    return null;
  }

  return (
    <Box
      pt="xs"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      })}
    >
      <Popover position="right">
        <Popover.Target>
          <NavLink
            label={user.name}
            description={user.email}
            icon={
              <ThemeIcon color="pink" variant="light" size="xl" radius="xl">
                <IconUserCircle />
              </ThemeIcon>
            }
            rightSection={<IconChevronRight size={12} />}
          />
        </Popover.Target>
        <Popover.Dropdown
          sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}
        >
          <Button color="dark" variant="outline">
            Sign out
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
}
