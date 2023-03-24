import { Card, Menu, ActionIcon, Accordion, Text, Flex } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons';
import { GolfPlayer } from 'src/types';
import { openEditPlayerModal, usePersonalScorecardsCollection, useScorecardsCollection } from 'src/utils';
import { AdjustedScoresGraph } from './graphs/AdjustedScoresGraph';

type PlayerStatisticsProps = {
  player: GolfPlayer;
  isOwner: boolean;
};

export const PlayerStatistics = ({ player, isOwner }: PlayerStatisticsProps) => {
  const scorecards = useScorecardsCollection();
  const playerScorecards = scorecards.data?.filter((scorecard) => scorecard.userId === player.id);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Flex align="center" justify="space-between">
          <Flex align="center" mt="md" mb="xs">
            <Text weight="bold">{player.name}</Text>
          </Flex>
          <Flex align="center" mt="md" mb="xs">
            {isOwner && (
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconPencil size={14} />} onClick={() => openEditPlayerModal({ player })}>
                    Edit
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Card.Section>
      <Card.Section>
        <Accordion chevronPosition="left">
          <Accordion.Item value="0">
            <Accordion.Control>Full statistics</Accordion.Control>
            <Accordion.Panel>{playerScorecards && <AdjustedScoresGraph scorecards={playerScorecards} />}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
};
