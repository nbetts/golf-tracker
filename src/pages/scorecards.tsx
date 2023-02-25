import { Button, Divider, Flex, MultiSelect, Text } from '@mantine/core';
import { Layout, PlayerScorecard } from 'src/components';
import { useEffect, useState } from 'react';
import { GolfCourse, GolfPlayer, GolfScorecard } from 'src/types';
import {
  useScorecardsCollection,
  usePersonalScorecardsCollection,
  useFirebaseAuthUser,
  useCoursesCollection,
  usePlayersCollection,
  openAddScorecardModal,
  withAuthCheck,
} from 'src/utils';
import { useLocalStorage } from '@mantine/hooks';

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
  const userId = user.data?.uid;
  const courses = useCoursesCollection();
  const players = usePlayersCollection();

  const sortedCourses = courses.data?.sort((a, b) => a.name.localeCompare(b.name));
  const sortedPlayers = players.data?.sort((a, b) => a.name.localeCompare(b.name));

  const [coursesFilterValues, onCoursesFilterValuesChange] = useLocalStorage<string[]>({
    key: 'scorecards-page-courses-filter',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const [playersFilterValues, onPlayersFilterValuesChange] = useLocalStorage<string[]>({
    key: 'scorecards-page-players-filter',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (userId && sessionStorage['golf-tracker-add-scorecard-modal-form-inputs']) {
      openAddScorecardModal({ userId });
    }
  }, [userId]);

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Scorecards
        </Text>
        <Button onClick={() => userId && openAddScorecardModal({ userId })}>Add scorecard</Button>
      </Flex>
      <Flex align="center">
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
      </Flex>
      <Divider />
      <Flex direction="column">
        {userId && sortedCourses && sortedPlayers && (
          <ScorecardsFilter
            userId={userId}
            courses={sortedCourses}
            players={sortedPlayers}
            coursesFilterValues={coursesFilterValues}
            playersFilterValues={playersFilterValues}
          />
        )}
      </Flex>
    </Layout>
  );
};

export default withAuthCheck(Scorecards);
