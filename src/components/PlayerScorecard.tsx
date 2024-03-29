import { Card, Badge, Anchor, Table, Menu, ActionIcon, Accordion, Text, Tooltip, Flex } from '@mantine/core';
import { IconDots, IconPencil, IconQuestionMark } from '@tabler/icons';
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
  let outPar = 0;
  let outYards = 0;
  let outPlayerScore = 0;
  let inPar = 0;
  let inYards = 0;
  let inPlayerScore = 0;

  for (let i = 0; i < holeCount; i++) {
    scoredHoles.push({ ...holes[i], score: scores[i] });

    if (i < 9) {
      outPar += holes[i].par;
      outYards += holes[i].yards;
      outPlayerScore += scores[i];
    } else {
      inPar += holes[i].par;
      inYards += holes[i].yards;
      inPlayerScore += scores[i];
    }
  }

  const netPar = outPar + inPar;
  const netYards = outYards + inYards;
  const netPlayerScore = outPlayerScore + inPlayerScore;
  const adjustedScore = Math.round((netPlayerScore / netPar) * 72);

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
            <Text weight="bold">{name}</Text>
            <Badge size="lg" color="cyan" variant="light">
              {scoredHoles.length} hole{scoredHoles.length === 1 ? '' : 's'}
            </Badge>
            <Badge size="lg" color="green" variant="light">
              Par {netPar}
            </Badge>
            <Badge size="lg" color="pink" variant="light">
              Score {netPlayerScore}
            </Badge>
            <Tooltip label="Adjusted score to par 72" withArrow>
              <Badge size="lg" color="orange" variant="light">
                AS. {adjustedScore}
              </Badge>
            </Tooltip>
            {isOwner && (
              <>
                {hidden && (
                  <Tooltip label="Other players cannot see this scorecard" withArrow>
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
                  {scoredHoles.slice(0, 9).map((hole, index) => (
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
                  {scoredHoles.length > 9 && (
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
                            {outPlayerScore}
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
                      {scoredHoles.slice(9).map((hole, index) => (
                        <tr key={index}>
                          <td>
                            <Text align="center">{index + 9 + 1}</Text>
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
                            {inPlayerScore}
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
