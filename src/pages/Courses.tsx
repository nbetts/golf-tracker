import { Stack, Text } from '@mantine/core';
import withRouteCheck from '../../src/utils/withRouteCheck';
import CourseScorecard from '../../src/components/CourseScorecard';
import store from '../utils/store';

const Courses = () => {
  const courses = store.useState((s) => s.courses);
  const coursesArray = Object.entries(courses).sort(([, a], [, b]) => a.name.localeCompare(b.name));

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Courses
      </Text>
      <Stack justify="flex-start">
        {coursesArray.map(([id, course]) => (
          <CourseScorecard key={id} {...course} />
        ))}
      </Stack>
    </>
  );
};

export default withRouteCheck(Courses, 'signed-in');
