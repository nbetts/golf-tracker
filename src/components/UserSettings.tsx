import { IconChevronRight } from '@tabler/icons';
import { Box, NavLink, Popover, Button, Avatar } from '@mantine/core';
import store from '../../src/utils/store';
import { signInWithGoogle, signOut } from '../../src/utils/firebase';
import { showNotification } from '@mantine/notifications';

export function UserSettings() {
  const user = store.useState((s) => s.user);

  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      showNotification({ title: 'Unable to sign in', message: error?.message, color: 'red' });
    }
  };

  return (
    <Box
      pt="xs"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      })}
    >
      {user ? (
        <Popover position="right">
          <Popover.Target>
            <NavLink
              label={user.displayName}
              description={user.email}
              icon={<Avatar color="pink" radius="xl" />}
              rightSection={<IconChevronRight size={12} />}
            />
          </Popover.Target>
          <Popover.Dropdown
            sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}
          >
            <Button color="pink" variant="outline" onClick={signOut}>
              Sign out
            </Button>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <NavLink
          label="Sign in"
          icon={<Avatar color="pink" radius="xl" />}
          rightSection={<IconChevronRight size={12} />}
          onClick={signIn}
        />
      )}
    </Box>
  );
}
