import { Stack } from '@mantine/core';
import store from '../utils/store';

export default function Players() {
  const golfPlayers = store.useState((s) => s.golfPlayers);
  golfPlayers.sort((a, b) => a.user.name.localeCompare(b.user.name));

  return (
    <Stack justify="flex-start">
      {golfPlayers.map((player, index) => (
        <p key={index}>{player.user.name}</p>
      ))}
    </Stack>
  );
}
