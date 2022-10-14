import { Stack, Text } from '@mantine/core';
import store from '../utils/store';
import PlayerScorecard from '../components/PlayerScorecard';
import withRouteCheck from '../../src/utils/withRouteCheck';

const Scorecards = () => {
  const user = store.useState((s) => s.user);
  console.log('uid', user?.uid);
  const courses = store.useState((s) => s.courses);
  const players = store.useState((s) => s.players);
  const scorecards = store.useState((s) => s.scorecards);
  const scorecardsArray = Object.entries(scorecards).sort(([, a], [, b]) => b.timestamp.seconds - a.timestamp.seconds);

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Scorecards
      </Text>
      <Stack>
        {scorecardsArray.map(([id, scorecard]) => (
          <PlayerScorecard
            key={id}
            course={courses[scorecard.courseId]}
            player={players[scorecard.userId]}
            scorecard={scorecard}
            isOwner={user?.uid === scorecard.userId}
            onEdit={() => null}
            onDelete={() => null}
          />
        ))}
      </Stack>
    </>
  );
};

export default withRouteCheck(Scorecards, 'signed-in');
