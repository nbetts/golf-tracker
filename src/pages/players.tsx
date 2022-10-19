import { Group, Stack, Text } from '@mantine/core';
import { withAuthCheck } from 'src/utils/withRouteCheck';
import PlayerStatistics from 'src/components/PlayerStatistics';
import Layout from 'src/components/Layout';
import { usePlayersCollection } from 'src/utils/firebase';

const Players = () => {
  const players = usePlayersCollection();

  return (
    <Layout>
      <Group position="apart" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Players
        </Text>
      </Group>
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
