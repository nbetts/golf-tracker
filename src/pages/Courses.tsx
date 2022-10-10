import { Stack, Text } from '@mantine/core';
import CourseScorecard from '../../src/components/CourseScorecard';
import store from '../utils/store';

export default function Courses() {
  const golfCourses = store.useState((s) => s.golfCourses);
  golfCourses.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Courses
      </Text>
      <Stack justify="flex-start">
        {golfCourses.map((course, index) => (
          <CourseScorecard key={index} {...course} />
        ))}
      </Stack>
    </>
  );
}
