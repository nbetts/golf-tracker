import { Stack, Text } from '@mantine/core';
import PlayerScorecard from 'src/components/PlayerScorecard';
import { withAuthCheck } from 'src/utils/withRouteCheck';
import Layout from 'src/components/Layout';
import {
  useCoursesCollection,
  useFirebaseAuthUser,
  usePlayersCollection,
  usePersonalScorecardsCollection,
  useScorecardsCollection,
} from 'src/utils/firebase';
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

  const userId = user.data?.uid || '';
  const personalScorecards = usePersonalScorecardsCollection(userId);
  const publicScorecards = useScorecardsCollection();
  const filteredScorecardInfo: CombinedScorecardInformation[] = [];

  if (courses.data && players.data && personalScorecards.data && publicScorecards.data) {
    const allScorecards = [...new Set([...personalScorecards.data, ...publicScorecards.data])];

    for (let i = 0; i < allScorecards.length; i++) {
      const scorecard = allScorecards[i];
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

export default withAuthCheck(Scorecards);
