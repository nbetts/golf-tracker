import { Stack, Text } from '@mantine/core';
import withRouteCheck from '../../src/utils/withRouteCheck';
import PlayerStatistics from '../../src/components/PlayerStatistics';
import store from '../utils/store';

const Players = () => {
  const golfPlayers = store.useState((s) => s.golfPlayers);
  // golfPlayers.sort((a, b) => a.user.name.localeCompare(b.user.name));

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Players
      </Text>
      <Stack justify="flex-start">
        {Object.entries(golfPlayers).map(([id, player]) => (
          <PlayerStatistics key={id} {...player} />
        ))}
      </Stack>
    </>
  );
};

export default withRouteCheck(Players, 'signed-in');
