import { IconChevronUp } from '@tabler/icons';
import { Box, NavLink, Popover, Button, Avatar } from '@mantine/core';
import { useSignOut } from 'src/utils/firebase';
import { User } from 'firebase/auth';

type UserSettingsProps = {
  user: User;
};

const UserSettings = ({ user }: UserSettingsProps) => {
  const signOut = useSignOut();

  return (
    <Box
      pt="xs"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      })}
    >
      <Popover position="top">
        <Popover.Target>
          <NavLink
            label={user.displayName}
            description={user.email}
            icon={<Avatar color="pink" radius="xl" src={user.photoURL} />}
            rightSection={<IconChevronUp size={12} />}
          />
        </Popover.Target>
        <Popover.Dropdown sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white })}>
          <Button color="pink" variant="outline" onClick={() => signOut.mutate()}>
            Sign out
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};

export default UserSettings;
