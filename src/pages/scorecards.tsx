import { Button, Divider, Group, MultiSelect, Stack, Text } from '@mantine/core';
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
import { openAddScorecardModal } from 'src/utils/modals';
import { useState } from 'react';

type CombinedScorecardInformation = {
  course: GolfCourse;
  player: GolfPlayer;
  scorecard: GolfScorecard;
};

type ScorecardsFilterProps = {
  userId: string;
  courses: GolfCourse[];
  players: GolfPlayer[];
  coursesFilterValues: string[];
  playersFilterValues: string[];
};

const ScorecardsFilter = ({ userId, courses, players, coursesFilterValues, playersFilterValues }: ScorecardsFilterProps) => {
  const publicScorecards = useScorecardsCollection();
  const personalScorecards = usePersonalScorecardsCollection(userId);

  if (!(publicScorecards.data && personalScorecards.data)) {
    return null;
  }

  const scorecards = [...publicScorecards.data, ...personalScorecards.data.filter((scorecard) => scorecard.hidden)];
  const filteredScorecardInfo: CombinedScorecardInformation[] = [];

  for (let i = 0; i < scorecards.length; i++) {
    const scorecard = scorecards[i];
    const player = players.find((player) => player.id === scorecard.userId);

    if (player) {
      const course = courses.find((course) => course.id === scorecard.courseId);

      if (course) {
        if (
          (coursesFilterValues.length === 0 || coursesFilterValues.includes(course.name)) &&
          (playersFilterValues.length === 0 || playersFilterValues.includes(player.name))
        ) {
          filteredScorecardInfo.push({ course, player, scorecard });
        }
      }
    }
  }

  filteredScorecardInfo.sort((a, b) => b.scorecard.timestamp.seconds - a.scorecard.timestamp.seconds);

  return (
    <>
      {filteredScorecardInfo.map((info) => (
        <PlayerScorecard key={info.scorecard.id} {...info} isOwner={userId === info.scorecard.userId} />
      ))}
    </>
  );
};

const Scorecards = () => {
  const user = useFirebaseAuthUser();
  const courses = useCoursesCollection();
  const players = usePlayersCollection();

  const sortedCourses = courses.data?.sort((a, b) => a.name.localeCompare(b.name));
  const sortedPlayers = players.data?.sort((a, b) => a.name.localeCompare(b.name));

  const [coursesFilterValues, onCoursesFilterValuesChange] = useState<string[]>([]);
  const [playersFilterValues, onPlayersFilterValuesChange] = useState<string[]>([]);

  return (
    <Layout>
      <Group position="apart" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Scorecards
        </Text>
        <Button onClick={() => user.data?.uid && openAddScorecardModal({ userId: user.data.uid })}>Add scorecard</Button>
      </Group>
      <Group>
        <MultiSelect
          data={sortedCourses?.map((course) => course.name) || []}
          label="Filter courses"
          placeholder="Select courses to filter"
          value={coursesFilterValues}
          onChange={onCoursesFilterValuesChange}
          searchable
          nothingFound="Nothing found"
          clearable
          clearButtonLabel="Clear selection"
          sx={{ maxWidth: 500 }}
        />
        <MultiSelect
          data={sortedPlayers?.map((player) => player.name) || []}
          label="Filter players"
          placeholder="Select players to filter"
          value={playersFilterValues}
          onChange={onPlayersFilterValuesChange}
          searchable
          nothingFound="Nothing found"
          clearable
          clearButtonLabel="Clear selection"
          sx={{ maxWidth: 500 }}
        />
      </Group>
      <Divider />
      <Stack>
        {user.data?.uid && sortedCourses && sortedPlayers && (
          <ScorecardsFilter
            userId={user.data.uid}
            courses={sortedCourses}
            players={sortedPlayers}
            coursesFilterValues={coursesFilterValues}
            playersFilterValues={playersFilterValues}
          />
        )}
      </Stack>
    </Layout>
  );
};

export default withAuthCheck(Scorecards);
