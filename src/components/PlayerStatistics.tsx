import { Card, Menu, ActionIcon, Accordion, Text, Flex } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons';
import { openEditPlayerModal } from 'src/utils/modals';
import { GolfPlayer } from 'src/utils/types';

type PlayerStatisticsProps = {
  player: GolfPlayer;
  isOwner: boolean;
};

const PlayerStatistics = ({ player, isOwner }: PlayerStatisticsProps) => {
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
            <Accordion.Panel>
              <Text>To do</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
};

export default PlayerStatistics;
