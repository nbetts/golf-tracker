import { Divider, Group, Stack, Text } from '@mantine/core';
import { withAuthCheck } from 'src/utils/withRouteCheck';
import PlayerStatistics from 'src/components/PlayerStatistics';
import Layout from 'src/components/Layout';
import { useFirebaseAuthUser, usePlayersCollection } from 'src/utils/firebase';

const Players = () => {
  const user = useFirebaseAuthUser();
  const players = usePlayersCollection();
  const sortedPlayers = players.data?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <Layout>
      <Group position="apart" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Players
        </Text>
      </Group>
      <Divider />
      <Stack justify="flex-start">
        {sortedPlayers.map((player) => (
          <PlayerStatistics key={player.id} player={player} isOwner={user.data?.uid === player.id} />
        ))}
      </Stack>
    </Layout>
  );
};

export default withAuthCheck(Players);
