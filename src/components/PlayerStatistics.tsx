import { Card, Menu, ActionIcon, Accordion, Text, Flex, List } from '@mantine/core';
import { IconDots, IconPencil } from '@tabler/icons';
import { GolfPlayer } from 'src/types';
import { openEditPlayerModal, useCoursesCollection, useScorecardsCollection } from 'src/utils';
import { AdjustedScoresGraph } from './graphs/AdjustedScoresGraph';
import { calculateAdjustedScore } from 'src/utils/calculateAdjustedScore';
import { useEffect, useState } from 'react';
import { HoleDifferencesGraph } from './graphs/HoldDifferencesGraph';

type SortedScore = {
  score: number;
  is18HoleRound: boolean;
};

type PlayerStatisticsProps = {
  player: GolfPlayer;
  isOwner: boolean;
};

export const PlayerStatistics = ({ player, isOwner }: PlayerStatisticsProps) => {
  const courses = useCoursesCollection();
  const scorecards = useScorecardsCollection();
  const playerScorecards = scorecards.data?.filter((scorecard) => scorecard.userId === player.id) || [];
  const coursesPlayed = new Set(playerScorecards.map((scorecard) => scorecard.courseId)).size;
  const [handicap18HoleRounds, setHandicap18HoleRounds] = useState('');
  const [handicapAllRounds, setHandicapAllRounds] = useState('');
  const [holeDifferences, setHoleDifferences] = useState<Record<string, number>>({});

  useEffect(() => {
    if (scorecards.data && courses.data) {
      const adjustedScores = playerScorecards
        .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
        .map<SortedScore>((scorecard) => {
          const course = courses.data.find((course) => course.id === scorecard.courseId);

          if (!course) {
            return {
              score: 0,
              is18HoleRound: false,
            };
          }

          let lastScoredHole = 1;

          for (let i = 0; i < scorecard.scores.length; i++) {
            if (scorecard.scores[i] > 0) {
              lastScoredHole = i + 1;
            }
          }

          return {
            score: calculateAdjustedScore(scorecard, course),
            is18HoleRound: lastScoredHole >= 18,
          };
        });

      const sortedScores18HoleRounds = adjustedScores
        .filter((score) => score.is18HoleRound)
        .slice(0, 20)
        .sort((a, b) => a.score - b.score)
        .slice(0, 8);
      const sortedScoresAllRounds = adjustedScores
        .slice(0, 20)
        .sort((a, b) => a.score - b.score)
        .slice(0, 8);
      setHandicap18HoleRounds(
        (sortedScores18HoleRounds.reduce((sum, curr) => sum + curr.score, 0) / sortedScores18HoleRounds.length - 72 || 0).toFixed(1),
      );
      setHandicapAllRounds((sortedScoresAllRounds.reduce((sum, curr) => sum + curr.score, 0) / sortedScoresAllRounds.length - 72 || 0).toFixed(1));

      const holeDifferences: Record<string, number> = {};

      playerScorecards.forEach((scorecard) => {
        const course = courses.data.find((course) => course.id === scorecard.courseId);

        if (course) {
          for (let i = 0; i < course.holes.length; i++) {
            if (scorecard.scores[i] > 0) {
              const holeDifference = scorecard.scores[i] - course.holes[i].par;

              if (holeDifference > 10) {
                continue;
              }

              const key = holeDifference >= 0 ? `+${holeDifference}` : holeDifference;

              if (!holeDifferences[key]) {
                holeDifferences[key] = 1;
              } else {
                holeDifferences[key]++;
              }
            }
          }
        }
      });

      setHoleDifferences(holeDifferences);
    }
  }, [scorecards.data, courses.data]);

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
            <Accordion.Control>Statistics</Accordion.Control>
            <Accordion.Panel>
              <List mb="md">
                <List.Item>Rounds played: {playerScorecards.length}</List.Item>
                <List.Item>Courses played: {coursesPlayed}</List.Item>
                <List.Item>Handicap (18 hole rounds): {handicap18HoleRounds}</List.Item>
                <List.Item>Handicap (all rounds): {handicapAllRounds}</List.Item>
              </List>
              <Text size="xl">Stroke breakdown</Text>
              <HoleDifferencesGraph holeDifferences={holeDifferences} />
              <Text size="xl">Scores adjusted to par 72</Text>
              <AdjustedScoresGraph scorecards={playerScorecards} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  );
};
