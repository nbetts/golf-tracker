import { Stack, Text } from '@mantine/core';
import store from '../utils/store';
import PlayerScorecard, { PlayerScorecardProps } from '../components/PlayerScorecard';

export default function Scorecards() {
  const golfCourses = store.useState((s) => s.golfCourses);
  const golfPlayers = store.useState((s) => s.golfPlayers);

  const scorecards: PlayerScorecardProps[] = [];

  for (let i = 0; i < golfPlayers.length; i++) {
    const golfPlayer = golfPlayers[i];

    for (let j = 0; j < golfPlayer.scorecards.length; j++) {
      const scorecard = golfPlayer.scorecards[j];
      const golfCourse = golfCourses.find((course) => course.name === scorecard.courseName);

      if (golfCourse) {
        scorecards.push({
          playerName: golfPlayer.user.name,
          scorecard,
          golfCourse,
        });
      }
    }
  }

  // Sort scorecards by reverse chronological order.
  scorecards.sort((a, b) => b.scorecard.date.getTime() - a.scorecard.date.getTime());

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Scorecards
      </Text>
      <Stack>
        {scorecards.map((scorecard, index) => (
          <PlayerScorecard key={index} {...scorecard} />
        ))}
      </Stack>
    </>
  );
}
