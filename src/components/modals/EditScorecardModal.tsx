import { Button, Card, Checkbox, Flex, NumberInput, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { Timestamp } from 'firebase/firestore';
import { GolfScorecard } from 'src/types';
import { useCoursesCollection, useScorecardDocumentMutation } from 'src/utils';

type FormInputs = {
  date: Date;
  courseId: string;
  scores: number[];
  hidden: boolean;
};

export type EditScorecardModalProps = {
  scorecard: GolfScorecard;
};

export const EditScorecardModal = ({ scorecard }: EditScorecardModalProps) => {
  const mutation = useScorecardDocumentMutation(scorecard.id);
  const courses = useCoursesCollection();

  const form = useForm<FormInputs>({
    initialValues: {
      date: scorecard.timestamp.toDate(),
      courseId: scorecard.courseId,
      scores: new Array(18).fill(0).map((_, index) => scorecard.scores[index] || 0),
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

  const holeFields = new Array(holeCount)
    .fill(0)
    .map((_item, index) => <NumberInput key={index} min={0} label={`Hole ${index + 1}`} {...form.getInputProps(`scores.${index}`)} />);

  const submitForm = (values: FormInputs) => {
    mutation.mutate(
      {
        timestamp: Timestamp.fromDate(values.date),
        courseId: values.courseId,
        scores: new Array(holeCount).fill(0).map((_, index) => values.scores[index] || 0),
        hidden: values.hidden,
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
        <Card shadow="sm" radius="md" withBorder p="sm">
          <Flex direction="column" gap="xs">
            {holeFields}
          </Flex>
        </Card>
        <Checkbox mt="sm" label="Hide this scorecard from other players" {...form.getInputProps('hidden', { type: 'checkbox' })} />
        <Flex justify="center">
          <Button type="submit" mt="md" disabled={mutation.isLoading}>
            Update scorecard
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
