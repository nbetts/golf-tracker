import { Card, Group, Badge, Anchor, Table, Menu, ActionIcon, Accordion, Text } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons';
import { openEditCourseModal } from 'src/utils/modals';
import { GolfCourse } from 'src/utils/types';

type CourseScorecardProps = {
  course: GolfCourse;
};

const CourseScorecard = ({ course }: CourseScorecardProps) => {
  const { name, website, holes } = course;

  let netPar = 0;
  let netYards = 0;

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
              {holes.length} hole{holes.length === 1 ? '' : 's'}
            </Badge>
            <Badge size="lg" color="green" variant="light">
              Par {netPar}
            </Badge>
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={16} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconPencil size={14} />} onClick={() => openEditCourseModal({ course })}>
                  Edit
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Card.Section>
      <Card.Section>
        <Accordion chevronPosition="left">
          <Accordion.Item value="0">
            <Accordion.Control>Full scorecard</Accordion.Control>
            <Accordion.Panel>
              <Table striped highlightOnHover withBorder captionSide="bottom" sx={{ maxWidth: 600 }}>
                <caption>Full scorecard</caption>
                <thead>
                  <tr>
                    <th>
                      <Text align="center">Hole</Text>
                    </th>
                    <th>
                      <Text align="center">Par</Text>
                    </th>
                    <th>
                      <Text align="center">Yards</Text>
                    </th>
                    <th>
                      <Text align="center">S. index</Text>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holes.map((hole, index) => (
                    <tr key={index}>
                      <td>
                        <Text align="center">{index + 1}</Text>
                      </td>
                      <td>
                        <Text align="center">{hole.par}</Text>
                      </td>
                      <td>
                        <Text align="center">{hole.yards}</Text>
                      </td>
                      <td>
                        <Text align="center">{hole.strokeIndex}</Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <Text align="center">Total</Text>
                    </th>
                    <th>
                      <Text align="center">{netPar}</Text>
                    </th>
                    <th>
                      <Text align="center">{netYards}</Text>
                    </th>
                    <th>
                      <Text align="center">-</Text>
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
};

export default CourseScorecard;
