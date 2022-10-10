import { Stack } from '@mantine/core';
import store from '../../src/utils/store';
import Scorecard, { ScorecardProps } from './Scorecard';

export default function Scorecards() {
  const golfCourses = store.useState((s) => s.golfCourses);
  const golfPlayers = store.useState((s) => s.golfPlayers);

  const scorecards: ScorecardProps[] = [];

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
    <Stack justify="flex-start">
      {scorecards.map((scorecard, index) => (
        <Scorecard key={index} {...scorecard} />
      ))}
    </Stack>
  );
}
