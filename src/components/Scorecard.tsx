import { Card, Group, Badge, Anchor, Table, Menu, ActionIcon, Accordion, Text } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons';
import { GolfCourse, GolfScorecard, ScoredGolfHole } from 'src/utils/types';

export type ScorecardProps = {
  playerName: string;
  scorecard: GolfScorecard;
  golfCourse: GolfCourse;
};

export default function Scorecard(props: ScorecardProps) {
  const { date, scores } = props.scorecard;
  const { name, website, holes } = props.golfCourse;

  const holeCount = Math.min(scores.length, holes.length);
  const scoredHoles: ScoredGolfHole[] = [];
  let netPar = 0,
    netYards = 0,
    netPlayerScore = 0;

  for (let i = 0; i < holeCount; i++) {
    scoredHoles.push({ ...holes[i], score: scores[i] });
    netPar += holes[i].par;
    netYards += holes[i].yards;
    netPlayerScore += scores[i];
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Group mt="md" mb="xs">
            <Badge size="lg" color="blue" variant="light">
              {date.toLocaleDateString()}
            </Badge>
            <Text weight="bold">{props.playerName}</Text>
          </Group>
          <Group mt="md" mb="xs">
            <Anchor weight="bold" href={website} target="_blank">
              {name}
            </Anchor>
            <Badge size="lg" color="green" variant="light">
              Par {netPar}
            </Badge>
            <Badge size="lg" color="pink" variant="light">
              Player score {netPlayerScore}
            </Badge>
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
                    <th>Score</th>
                    <th>Stroke Index</th>
                    <th>Yards</th>
                  </tr>
                </thead>
                <tbody>
                  {scoredHoles.map((hole, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{hole.par}</td>
                      <td>{hole.score}</td>
                      <td>{hole.strokeIndex}</td>
                      <td>{hole.yards}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>{netPar}</th>
                    <th>{netPlayerScore}</th>
                    <th></th>
                    <th>{netYards}</th>
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
