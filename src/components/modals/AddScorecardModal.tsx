import { Button, Card, Checkbox, Flex, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { Timestamp } from 'firebase/firestore';
import { useCoursesCollection, useScorecardsCollectionMutation } from 'src/utils';

type FormInputs = {
  date: Date;
  courseId: string;
  scores: number[];
  hidden: boolean;
};

export type AddScorecardModalProps = {
  userId: string;
};

export const AddScorecardModal = ({ userId }: AddScorecardModalProps) => {
  const mutation = useScorecardsCollectionMutation();
  const courses = useCoursesCollection();

  const form = useForm<FormInputs>({
    initialValues: {
      date: new Date(),
      courseId: '',
      scores: new Array(18).fill(''),
      hidden: false,
    },
    validate: {
      date: (value) => (!value ? 'Date is required' : null),
      courseId: (value) => (!value ? 'Course is required' : null),
    },
  });

  if (!courses.data) {
    return null;
  }

  const courseOptions = courses.data.sort((a, b) => a.name.localeCompare(b.name)).map((course) => ({ value: course.id, label: course.name }));
  const holeCount = courses.data.find((course) => course.id === form.values.courseId)?.holes.length || 0;

  const holeFields = new Array(holeCount)
    .fill(0)
    .map((_item, index) => <NumberInput key={index} min={0} label={`Hole ${index + 1}`} {...form.getInputProps(`scores.${index}`)} />);

  const submitForm = (values: FormInputs) => {
    mutation.mutate(
      {
        timestamp: Timestamp.fromDate(values.date),
        courseId: values.courseId,
        scores: values.scores.map((score) => score || 0),
        hidden: values.hidden,
        userId,
        deleted: false,
      },
      {
        onSuccess: () => closeAllModals(),
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Flex direction="column">
        <DatePicker label="Date" placeholder="Choose date" {...form.getInputProps('date')} maxDate={new Date()} data-autofocus />
        {courseOptions && <Select label="Course" placeholder="Choose course" data={courseOptions} {...form.getInputProps('courseId')} />}
        {form.values.courseId && (
          <Card shadow="sm" radius="md" withBorder p="sm">
            <Flex direction="column" gap="xs">
              {holeFields}
            </Flex>
          </Card>
        )}
        <Checkbox mt="sm" label="Hide this scorecard from other players" {...form.getInputProps('hidden')} />
        <Flex justify="center">
          <Button type="submit" mt="md" disabled={mutation.isLoading}>
            Add scorecard
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
