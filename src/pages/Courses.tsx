import { Stack, Text } from '@mantine/core';
import { withAuthCheck } from 'src/utils/withRouteCheck';
import CourseScorecard from 'src/components/CourseScorecard';
import Layout from 'src/components/Layout';
import { useCoursesCollection } from 'src/utils/firebase';

const Courses = () => {
  const courses = useCoursesCollection();

  return (
    <Layout>
      <Text size={30} weight="bold" mb="sm">
        Courses
      </Text>
      <Stack justify="flex-start">
        {courses.data?.map((course) => (
          <CourseScorecard key={course.id} {...course} />
        ))}
      </Stack>
    </Layout>
  );
};

export default withAuthCheck(Courses);
