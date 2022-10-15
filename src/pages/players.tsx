import { Stack, Text } from '@mantine/core';
import withRouteCheck from 'src/utils/withRouteCheck';
import PlayerStatistics from 'src/components/PlayerStatistics';
import Layout from 'src/components/Layout';
import { usePlayersCollection } from 'src/utils/firebase';

const Players = () => {
  const players = usePlayersCollection();

  return (
    <Layout>
      <Text size={30} weight="bold" mb="sm">
        Players
      </Text>
      <Stack justify="flex-start">
        {players.data?.map((player) => (
          <PlayerStatistics key={player.id} {...player} />
        ))}
      </Stack>
    </Layout>
  );
};

export default withRouteCheck(Players, 'signed-in');
