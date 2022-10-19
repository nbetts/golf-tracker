import { Button, Card, Checkbox, NumberInput, Select, Stack } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { Timestamp } from 'firebase/firestore';
import { useCoursesCollection, useScorecardsCollectionMutation } from 'src/utils/firebase';

type FormInputs = {
  date: Date;
  courseId: string;
  scores: { score: number }[];
  hidden: boolean;
};

export type AddScorecardModalProps = {
  userId: string;
};

const AddScorecardModal = ({ userId }: AddScorecardModalProps) => {
  const mutation = useScorecardsCollectionMutation();
  const courses = useCoursesCollection();

  const form = useForm<FormInputs>({
    initialValues: {
      date: new Date(),
      courseId: '',
      scores: new Array(18).fill({ score: 0 }),
      hidden: false,
    },
    validate: {
      date: (value) => (!value ? 'Date is required' : null),
      courseId: (value) => (!value ? 'Course is required' : null),
      scores: {
        score: (value) => (value > 0 ? null : 'Cannot be 0'),
      },
    },
  });

  if (!courses.data) {
    return null;
  }

  const courseOptions = courses.data.sort((a, b) => a.name.localeCompare(b.name)).map((course) => ({ value: course.id, label: course.name }));
  const holeCount = courses.data.find((course) => course.id === form.values.courseId)?.holes.length || 0;

  const holeFields = new Array(holeCount).fill(0).map((_item, index) => (
    <Card key={index} shadow="sm" radius="md" withBorder p="sm">
      <NumberInput size="xs" min={0} label={`Hole ${index + 1}`} {...form.getInputProps(`scores.${index}.score`)} />
    </Card>
  ));

  const submitForm = (values: FormInputs) => {
    mutation.mutate({
      id: '',
      timestamp: Timestamp.fromDate(values.date),
      courseId: values.courseId,
      scores: values.scores.map(({ score }) => score),
      hidden: values.hidden,
      userId,
      deleted: false,
    });
    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Stack>
        <DatePicker label="Date" placeholder="Choose date" {...form.getInputProps('date')} maxDate={new Date()} data-autofocus />
        {courseOptions && <Select label="Course" placeholder="Choose course" data={courseOptions} {...form.getInputProps('courseId')} />}
        {holeFields}
        <Checkbox mt="sm" label="Hide this scorecard from other players" {...form.getInputProps('hidden')} />
        <Button type="submit" mt="md" disabled={mutation.isLoading}>
          Add scorecard
        </Button>
      </Stack>
    </form>
  );
};

export default AddScorecardModal;
