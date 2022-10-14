import { Stack, Text } from '@mantine/core';
import withRouteCheck from '../../src/utils/withRouteCheck';
import PlayerStatistics from '../../src/components/PlayerStatistics';
import store from '../utils/store';

const Players = () => {
  const players = store.useState((s) => s.players);
  const playersArray = Object.entries(players).sort(([, a], [, b]) => a.name.localeCompare(b.name));

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Players
      </Text>
      <Stack justify="flex-start">
        {playersArray.map(([id, player]) => (
          <PlayerStatistics key={id} {...player} />
        ))}
      </Stack>
    </>
  );
};

export default withRouteCheck(Players, 'signed-in');
