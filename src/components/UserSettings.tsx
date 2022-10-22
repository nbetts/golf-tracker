import { IconChevronRight } from '@tabler/icons';
import { Box, NavLink, Popover, Button, Avatar } from '@mantine/core';
import { useSignIn, useSignOut } from 'src/utils/firebase';
import { GoogleAuthProvider, User } from 'firebase/auth';

type UserSettingsProps = {
  user?: User;
};

const UserSettings = ({ user }: UserSettingsProps) => {
  const signIn = useSignIn();
  const signOut = useSignOut();

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
              icon={<Avatar color="pink" radius="xl" src={user.photoURL} />}
              rightSection={<IconChevronRight size={12} />}
            />
          </Popover.Target>
          <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
            <Button color="pink" variant="outline" onClick={() => signOut.mutate()}>
              Sign out
            </Button>
          </Popover.Dropdown>
        </Popover>
      ) : (
        <NavLink
          label="Sign in"
          icon={<Avatar color="pink" radius="xl" />}
          rightSection={<IconChevronRight size={12} />}
          onClick={() => signIn.mutate({ provider: new GoogleAuthProvider() })}
        />
      )}
    </Box>
  );
};

export default UserSettings;
