import { Stack, Text } from '@mantine/core';
import withRouteCheck from 'src/utils/withRouteCheck';
import CourseScorecard from 'src/components/CourseScorecard';
import store from 'src/utils/store';
import Layout from 'src/components/Layout';

const Courses = () => {
  const courses = store.useState((s) => s.courses);
  const coursesArray = Object.entries(courses).sort(([, a], [, b]) => a.name.localeCompare(b.name));

  return (
    <Layout>
      <Text size={30} weight="bold" mb="sm">
        Courses
      </Text>
      <Stack justify="flex-start">
        {coursesArray.map(([id, course]) => (
          <CourseScorecard key={id} {...course} />
        ))}
      </Stack>
    </Layout>
  );
};

export default withRouteCheck(Courses, 'signed-in');
