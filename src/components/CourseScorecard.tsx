import { Card, Group, Badge, Anchor, Table, Menu, ActionIcon, Accordion } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons';
import { useFirebaseAuthUser } from 'src/utils/firebase';
import { openEditCourseModal } from 'src/utils/modals';
import { GolfCourse } from 'src/utils/types';

export default function CourseScorecard(props: GolfCourse) {
  const user = useFirebaseAuthUser();
  const { name, website, holes } = props;

  let netPar = 0,
    netYards = 0;

  for (let i = 0; i < holes.length; i++) {
    netPar += holes[i].par;
    netYards += holes[i].yards;
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Group mt="md" mb="xs">
            <Anchor weight="bold" href={website} target="_blank">
              {name}
            </Anchor>
          </Group>
          <Group mt="md" mb="xs">
            <Badge size="lg" color="cyan" variant="light">
              {holes.length} holes
            </Badge>
            <Badge size="lg" color="green" variant="light">
              Par {netPar}
            </Badge>
            {user.data && (
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconPencil size={14} />} onClick={() => openEditCourseModal({ course: props })}>
                    Edit
                  </Menu.Item>
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
            <Accordion.Control>Full scorecard</Accordion.Control>
            <Accordion.Panel>
              <Table striped highlightOnHover withBorder>
                <thead>
                  <tr>
                    <th>Hole</th>
                    <th>Par</th>
                    <th>Yards</th>
                    <th>Stroke Index</th>
                  </tr>
                </thead>
                <tbody>
                  {holes.map((hole, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{hole.par}</td>
                      <td>{hole.yards}</td>
                      <td>{hole.strokeIndex}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>{netPar}</th>
                    <th>{netYards}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
}
