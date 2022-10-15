import { Stack, Text } from '@mantine/core';
import PlayerScorecard from 'src/components/PlayerScorecard';
import withRouteCheck from 'src/utils/withRouteCheck';
import Layout from 'src/components/Layout';
import { useCoursesCollection, useFirebaseAuthUser, usePlayersCollection, useScorecardsCollection } from 'src/utils/firebase';
import { GolfCourse, GolfPlayer, GolfScorecard } from 'src/utils/types';

type CombinedScorecardInformation = {
  course: GolfCourse;
  player: GolfPlayer;
  scorecard: GolfScorecard;
};

const Scorecards = () => {
  const user = useFirebaseAuthUser();
  const courses = useCoursesCollection();
  const players = usePlayersCollection();
  const scorecards = useScorecardsCollection();
  const filteredScorecardInfo: CombinedScorecardInformation[] = [];

  if (courses.data && players.data && scorecards.data) {
    for (let i = 0; i < scorecards.data.length; i++) {
      const scorecard = scorecards.data[i];
      const player = players.data.find((player) => player.id === scorecard.userId);

      if (player) {
        const course = courses.data.find((course) => course.id === scorecard.courseId);

        if (course) {
          filteredScorecardInfo.push({ course, player, scorecard });
        }
      }
    }
  }

  return (
    <Layout>
      <Text size={30} weight="bold" mb="sm">
        Scorecards
      </Text>
      <Stack>
        {filteredScorecardInfo.map((info) => (
          <PlayerScorecard
            key={info.scorecard.id}
            {...info}
            isOwner={user.data?.uid === info.scorecard.userId}
            onEdit={() => null}
            onDelete={() => null}
          />
        ))}
      </Stack>
    </Layout>
  );
};

export default withRouteCheck(Scorecards, 'signed-in');
