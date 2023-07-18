import { Button, Divider, Flex, MultiSelect, SelectItem, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect } from 'react';
import { Layout, CourseScorecard } from 'src/components';
import { GolfCourse } from 'src/types';
import { useCoursesCollection, openAddCourseModal, withAuthCheck, openEditCourseModal } from 'src/utils';

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

  useEffect(() => {
    if (localStorage['golf-tracker-add-course-modal-form-inputs']) {
      openAddCourseModal();
    } else if (localStorage['golf-tracker-edit-course-modal-form-inputs']) {
      const storedFormValues = localStorage.getItem('golf-tracker-edit-course-modal-form-inputs');

      if (storedFormValues) {
        try {
          const parsedFormValues = JSON.parse(storedFormValues);

          if (parsedFormValues) {
            const course: GolfCourse = {
              id: parsedFormValues.courseId,
              name: parsedFormValues.name,
              website: parsedFormValues.website,
              holes: parsedFormValues.holes,
              deleted: parsedFormValues.deleted,
            };
            openEditCourseModal({ course });
          } else {
            localStorage.removeItem('golf-tracker-edit-course-modal-form-inputs');
          }
        } catch (error) {}
      }
    }
  }, []);

  const filteredCourses = sortedCourses.filter((course) => coursesFilterValues.length === 0 || coursesFilterValues.includes(course.id));

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
      <Text>{filteredCourses.length} courses</Text>
      <Divider />
      <Flex direction="column" justify="flex-start">
        {filteredCourses.map((course) => (
          <CourseScorecard key={course.id} course={course} />
        ))}
      </Flex>
    </Layout>
  );
};

export default withAuthCheck(Courses);
