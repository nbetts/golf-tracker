import { Stack } from '@mantine/core';
import store from '../utils/store';

export default function Courses() {
  const golfCourses = store.useState((s) => s.golfCourses);
  golfCourses.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Stack justify="flex-start">
      {golfCourses.map((course, index) => (
        <p key={index}>{course.name}</p>
      ))}
    </Stack>
  );
}
