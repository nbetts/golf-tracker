import { Box, Button, Center, Flex, Stack } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { useSignOut } from 'src/utils';

export const AccountSettingsModal = () => {
  const signOut = useSignOut();

  return (
    <Flex direction="column">
      <Center>
        <Button
          color="pink"
          variant="outline"
          onClick={() =>
            signOut.mutate(undefined, {
              onSuccess: () => closeAllModals(),
            })
          }
        >
          Sign out
        </Button>
      </Center>
      <Flex justify="center">
        <Button type="submit" mt="md" onClick={() => closeAllModals()}>
          Close
        </Button>
      </Flex>
    </Flex>
  );
};
