import { Stack, Text } from '@mantine/core';
import { withAuthCheck } from 'src/utils/withRouteCheck';
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
        {players.data
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((player) => (
            <PlayerStatistics key={player.id} {...player} />
          ))}
      </Stack>
    </Layout>
  );
};

export default withAuthCheck(Players);
