import { Card, Group, Menu, ActionIcon, Accordion, Text } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons';
import store from 'src/utils/store';
import { GolfPlayer } from 'src/utils/types';

export default function PlayerStatistics(props: GolfPlayer) {
  const user = store.useState((s) => s.user);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Group mt="md" mb="xs">
            <Text weight="bold">{props.name}</Text>
          </Group>
          <Group mt="md" mb="xs">
            {user && (
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconPencil size={14} />}>Edit</Menu.Item>
                  <Menu.Item icon={<IconTrash size={14} />} color="red">
                    Delete
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
}
