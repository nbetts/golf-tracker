import { Card, Badge, Anchor, Table, Menu, ActionIcon, Accordion, Text, Tooltip, Flex } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons';
import { GolfCourse, GolfPlayer, GolfScorecard, ScoredGolfHole } from 'src/types';
import { openEditScorecardModal } from 'src/utils';

type PlayerScorecardProps = {
  course: GolfCourse;
  player: GolfPlayer;
  scorecard: GolfScorecard;
  isOwner: boolean;
};

export const PlayerScorecard = ({ course, player, scorecard, isOwner }: PlayerScorecardProps) => {
  const { hidden, timestamp, scores } = scorecard;
  const { name, website, holes } = course;

  // Calculate the last score index so that we don't need to show any more holes after that.
  let lastScoredHole = 1;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > 0) {
      lastScoredHole = i + 1;
    }
  }

  const holeCount = Math.min(lastScoredHole, holes.length);
  const scoredHoles: ScoredGolfHole[] = [];
  let netPar = 0;
  let netYards = 0;
  let netPlayerScore = 0;

  for (let i = 0; i < holeCount; i++) {
    scoredHoles.push({ ...holes[i], score: scores[i] });
    netPar += holes[i].par;
    netYards += holes[i].yards;
    netPlayerScore += scores[i];
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Flex align="center" justify="space-between">
          <Flex align="center" mt="md" mb="xs">
            <Badge size="lg" color="blue" variant="light">
              {timestamp.toDate().toLocaleDateString()}
            </Badge>
            <Text weight="bold">{player.name}</Text>
          </Flex>
          <Flex align="center" mt="md" mb="xs">
            <Anchor weight="bold" href={website} target="_blank">
              {name}
            </Anchor>
            <Badge size="lg" color="cyan" variant="light">
              {scoredHoles.length} hole{scoredHoles.length === 1 ? '' : 's'}
            </Badge>
            <Badge size="lg" color="green" variant="light">
              Par {netPar}
            </Badge>
            <Badge size="lg" color="pink" variant="light">
              Score {netPlayerScore}
            </Badge>
            {isOwner && (
              <>
                {hidden && (
                  <Tooltip label="Other players cannot see this scorecard">
                    <Badge size="lg" color="violet" variant="light">
                      Hidden
                    </Badge>
                  </Tooltip>
                )}
                <Menu withinPortal position="bottom-end" shadow="sm">
                  <Menu.Target>
                    <ActionIcon>
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={() => openEditScorecardModal({ scorecard })} icon={<IconPencil size={14} />}>
                      Edit
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </Flex>
        </Flex>
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
                      <Text align="center">Score</Text>
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
                  {scoredHoles.map((hole, index) => (
                    <tr key={index}>
                      <td>
                        <Text align="center">{index + 1}</Text>
                      </td>
                      <td>
                        <Text align="center">{hole.par}</Text>
                      </td>
                      <td>
                        <Text align="center">{hole.score}</Text>
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
                      <Text align="center">{netPlayerScore}</Text>
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
