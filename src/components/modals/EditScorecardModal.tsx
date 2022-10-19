import { Button, Card, Checkbox, NumberInput, Select, Stack } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { Timestamp } from 'firebase/firestore';
import { useCoursesCollection, useScorecardDocumentMutation } from 'src/utils/firebase';
import { GolfScorecard } from 'src/utils/types';

type FormInputs = {
  date: Date;
  courseId: string;
  scores: number[];
  hidden: boolean;
};

export type EditScorecardModalProps = {
  scorecard: GolfScorecard;
};

const EditScorecardModal = ({ scorecard }: EditScorecardModalProps) => {
  const mutation = useScorecardDocumentMutation(scorecard.id);
  const courses = useCoursesCollection();

  const form = useForm<FormInputs>({
    initialValues: {
      date: scorecard.timestamp.toDate(),
      courseId: scorecard.courseId,
      scores: new Array(18).fill(0).map((score, index) => scorecard.scores[index] || score),
      hidden: scorecard.hidden,
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

  const holeFields = new Array(holeCount).fill(0).map((_item, index) => (
    <Card key={index} shadow="sm" radius="md" withBorder p="sm">
      <NumberInput size="xs" min={0} label={`Hole ${index + 1}`} {...form.getInputProps(`scores.${index}`)} />
    </Card>
  ));

  const submitForm = (values: FormInputs) => {
    mutation.mutate({
      timestamp: Timestamp.fromDate(values.date),
      courseId: values.courseId,
      scores: new Array(holeCount).fill(0).map((score, index) => values.scores[index] || score),
      hidden: values.hidden,
    });
    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Stack>
        <DatePicker label="Date" placeholder="Choose date" {...form.getInputProps('date')} maxDate={new Date()} data-autofocus />
        {courseOptions && <Select label="Course" placeholder="Choose course" data={courseOptions} {...form.getInputProps('courseId')} />}
        {holeFields}
        <Checkbox mt="sm" label="Hide this scorecard from other players" {...form.getInputProps('hidden', { type: 'checkbox' })} />
        <Button type="submit" mt="md" disabled={mutation.isLoading}>
          Update scorecard
        </Button>
      </Stack>
    </form>
  );
};

export default EditScorecardModal;
