import { Stack, Text } from '@mantine/core';
import store from '../utils/store';
import PlayerScorecard, { PlayerScorecardProps } from '../components/PlayerScorecard';
import withRouteCheck from '../../src/utils/withRouteCheck';

const Scorecards = () => {
  const golfCourses = store.useState((s) => s.golfCourses);
  const golfPlayers = store.useState((s) => s.golfPlayers);

  const golfPlayersArray = Object.entries(golfPlayers);
  const scorecards: PlayerScorecardProps[] = [];

  for (let i = 0; i < golfPlayersArray.length; i++) {
    const [, golfPlayer] = golfPlayersArray[i];
    const scorecardsArray = Object.entries(golfPlayer.scorecards);

    for (let j = 0; j < scorecardsArray.length; j++) {
      const [, scorecard] = scorecardsArray[j];
      const golfCourse = golfCourses[scorecard.courseId];

      if (golfCourse) {
        scorecards.push({
          playerName: golfPlayer.name,
          scorecard,
          golfCourse,
        });
      }
    }
  }

  // Sort scorecards by reverse chronological order.
  scorecards.sort((a, b) => b.scorecard.timestamp.seconds - a.scorecard.timestamp.seconds);

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
};

export default withRouteCheck(Scorecards, 'signed-in');
