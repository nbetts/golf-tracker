import { Button, Divider, Group, Stack, Text } from '@mantine/core';
import { withAuthCheck } from 'src/utils/withRouteCheck';
import CourseScorecard from 'src/components/CourseScorecard';
import Layout from 'src/components/Layout';
import { useCoursesCollection } from 'src/utils/firebase';
import { openAddCourseModal } from 'src/utils/modals';

const Courses = () => {
  const courses = useCoursesCollection();
  const sortedCourses = courses.data?.sort((a, b) => a.name.localeCompare(b.name)) || [];

  return (
    <Layout>
      <Group position="apart" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Courses
        </Text>
        <Button onClick={() => openAddCourseModal()}>Add course</Button>
      </Group>
      <Divider />
      <Stack justify="flex-start">
        {sortedCourses.map((course) => (
          <CourseScorecard key={course.id} course={course} />
        ))}
      </Stack>
    </Layout>
  );
};

export default withAuthCheck(Courses);
