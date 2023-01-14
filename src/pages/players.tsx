import { Divider, Flex, Text } from '@mantine/core';
import { Layout, PlayerStatistics } from 'src/components';
import { useFirebaseAuthUser, usePlayersCollection, withAuthCheck } from 'src/utils';

const Players = () => {
  const user = useFirebaseAuthUser();
  const players = usePlayersCollection();
  const sortedPlayers = players.data?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Players
        </Text>
      </Flex>
      <Divider />
      <Flex direction="column" justify="flex-start">
        {sortedPlayers.map((player) => (
          <PlayerStatistics key={player.id} player={player} isOwner={user.data?.uid === player.id} />
        ))}
      </Flex>
    </Layout>
  );
};

export default withAuthCheck(Players);
