import { Stack, Text } from '@mantine/core';
import withRouteCheck from 'src/utils/withRouteCheck';
import PlayerStatistics from 'src/components/PlayerStatistics';
import store from 'src/utils/store';
import Layout from 'src/components/Layout';

const Players = () => {
  const players = store.useState((s) => s.players);
  const playersArray = Object.entries(players).sort(([, a], [, b]) => a.name.localeCompare(b.name));

  return (
    <Layout>
      <Text size={30} weight="bold" mb="sm">
        Players
      </Text>
      <Stack justify="flex-start">
        {playersArray.map(([id, player]) => (
          <PlayerStatistics key={id} {...player} />
        ))}
      </Stack>
    </Layout>
  );
};

export default withRouteCheck(Players, 'signed-in');
