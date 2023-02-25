import { Divider, Flex, MultiSelect, SelectItem, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Layout, PlayerStatistics } from 'src/components';
import { useFirebaseAuthUser, usePlayersCollection, withAuthCheck } from 'src/utils';

const Players = () => {
  const user = useFirebaseAuthUser();
  const players = usePlayersCollection();
  const sortedPlayers = players.data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  const playersMultiSelectData = sortedPlayers.map<SelectItem>((player) => ({
    label: player.name,
    value: player.id,
  }));

  const [playersFilterValues, onPlayersFilterValuesChange] = useLocalStorage<string[]>({
    key: 'players-page-players-filter',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Players
        </Text>
      </Flex>
      <Flex align="center">
        <MultiSelect
          data={playersMultiSelectData}
          label="Filter players"
          placeholder="Select players to filter"
          value={playersFilterValues}
          onChange={onPlayersFilterValuesChange}
          searchable
          nothingFound="Nothing found"
          clearable
          clearButtonLabel="Clear selection"
          sx={{ maxWidth: 500 }}
        />
      </Flex>
      <Divider />
      <Flex direction="column" justify="flex-start">
        {sortedPlayers.map(
          (player) =>
            (playersFilterValues.length === 0 || playersFilterValues.includes(player.id)) && (
              <PlayerStatistics key={player.id} player={player} isOwner={user.data?.uid === player.id} />
            ),
        )}
      </Flex>
    </Layout>
  );
};

export default withAuthCheck(Players);
