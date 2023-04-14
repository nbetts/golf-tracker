import { Button, Dialog, Flex, Text } from '@mantine/core';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const ReloadPrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  return (
    <Dialog opened={needRefresh} onClose={() => setNeedRefresh(false)} radius="md" position={{ bottom: 20, left: 20, right: 20 }}>
      <Flex justify="center" align="center">
        <Text size="sm" mb="xs" weight={500} sx={{ flex: 1 }}>
          Update available. Click reload to update.
        </Text>
        <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
      </Flex>
    </Dialog>
  );
};
