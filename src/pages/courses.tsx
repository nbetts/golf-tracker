import { Button, Divider, Flex, MultiSelect, SelectItem, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Layout, CourseScorecard } from 'src/components';
import { useCoursesCollection, openAddCourseModal, withAuthCheck } from 'src/utils';

const Courses = () => {
  const courses = useCoursesCollection();
  const sortedCourses = courses.data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  const coursesMultiSelectData = sortedCourses.map<SelectItem>((course) => ({
    label: course.name,
    value: course.id,
  }));

  const [coursesFilterValues, onCoursesFilterValuesChange] = useLocalStorage<string[]>({
    key: 'courses-page-courses-filter',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  return (
    <Layout>
      <Flex align="center" justify="space-between" mb="lg">
        <Text size={30} weight="bold" m={0}>
          Courses
        </Text>
        <Button onClick={() => openAddCourseModal()}>Add course</Button>
      </Flex>
      <Flex align="center">
        <MultiSelect
          data={coursesMultiSelectData}
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
      </Flex>
      <Divider />
      <Flex direction="column" justify="flex-start">
        {sortedCourses.map(
          (course) =>
            (coursesFilterValues.length === 0 || coursesFilterValues.includes(course.id)) && <CourseScorecard key={course.id} course={course} />,
        )}
      </Flex>
    </Layout>
  );
};

export default withAuthCheck(Courses);
