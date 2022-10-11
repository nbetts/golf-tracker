import { Stack, Text } from '@mantine/core';
import withRouteCheck from '../../src/utils/withRouteCheck';
import CourseScorecard from '../../src/components/CourseScorecard';
import store from '../utils/store';

const Courses = () => {
  const golfCourses = store.useState((s) => s.golfCourses);
  // golfCourses.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Courses
      </Text>
      <Stack justify="flex-start">
        {Object.entries(golfCourses).map(([id, course]) => (
          <CourseScorecard key={id} {...course} />
        ))}
      </Stack>
    </>
  );
};

export default withRouteCheck(Courses, 'signed-in');
