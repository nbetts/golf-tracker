import { Stack, Text } from '@mantine/core';
import PlayerStatistics from '../../src/components/PlayerStatistics';
import store from '../utils/store';

export default function Players() {
  const golfPlayers = store.useState((s) => s.golfPlayers);
  golfPlayers.sort((a, b) => a.user.name.localeCompare(b.user.name));

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Players
      </Text>
      <Stack justify="flex-start">
        {golfPlayers.map((player, index) => (
          <PlayerStatistics key={index} {...player} />
        ))}
      </Stack>
    </>
  );
}
