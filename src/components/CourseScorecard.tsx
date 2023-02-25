import { Card, Badge, Anchor, Table, Menu, ActionIcon, Accordion, Text, Flex } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons';
import { GolfCourse } from 'src/types';
import { openEditCourseModal } from 'src/utils';

type CourseScorecardProps = {
  course: GolfCourse;
};

export const CourseScorecard = ({ course }: CourseScorecardProps) => {
  const { name, website, holes } = course;

  let outPar = 0;
  let outYards = 0;
  let inPar = 0;
  let inYards = 0;

  for (let i = 0; i < holes.length; i++) {
    if (i < 9) {
      outPar += holes[i].par;
      outYards += holes[i].yards;
    } else {
      inPar += holes[i].par;
      inYards += holes[i].yards;
    }
  }

  const netPar = outPar + inPar;
  const netYards = outYards + inYards;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Flex align="center" justify="space-between">
          <Flex align="center" mt="md" mb="xs">
            <Text weight="bold">{name}</Text>
          </Flex>
          <Flex align="center" mt="md" mb="xs">
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
          </Flex>
        </Flex>
      </Card.Section>
      <Card.Section>
        <Accordion chevronPosition="left">
          <Accordion.Item value="0">
            <Accordion.Control>Full scorecard</Accordion.Control>
            <Accordion.Panel>
              {website && (
                <Text mb="md">
                  {'Website: '}
                  <Anchor weight="bold" href={website} target="_blank">
                    {website}
                  </Anchor>
                </Text>
              )}
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
                  {holes.slice(0, 9).map((hole, index) => (
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
                  {holes.length > 9 && (
                    <>
                      <tr>
                        <td>
                          <Text align="center" weight="bold">
                            Out
                          </Text>
                        </td>
                        <td>
                          <Text align="center" weight="bold">
                            {outPar}
                          </Text>
                        </td>
                        <td>
                          <Text align="center" weight="bold">
                            {outYards}
                          </Text>
                        </td>
                        <td>
                          <Text align="center" weight="bold">
                            -
                          </Text>
                        </td>
                      </tr>
                      {holes.slice(9).map((hole, index) => (
                        <tr key={index}>
                          <td>
                            <Text align="center">{index + 9 + 1}</Text>
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
                      <tr>
                        <td>
                          <Text align="center" weight="bold">
                            In
                          </Text>
                        </td>
                        <td>
                          <Text align="center" weight="bold">
                            {inPar}
                          </Text>
                        </td>
                        <td>
                          <Text align="center" weight="bold">
                            {inYards}
                          </Text>
                        </td>
                        <td>
                          <Text align="center" weight="bold">
                            -
                          </Text>
                        </td>
                      </tr>
                    </>
                  )}
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
