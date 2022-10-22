import { Card, Group, Menu, ActionIcon, Accordion, Text } from '@mantine/core';
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
        <Group position="apart">
          <Group mt="md" mb="xs">
            <Text weight="bold">{player.name}</Text>
          </Group>
          <Group mt="md" mb="xs">
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
          </Group>
        </Group>
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
