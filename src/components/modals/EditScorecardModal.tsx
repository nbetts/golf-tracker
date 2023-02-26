import { Affix, Badge, Button, Card, Center, Checkbox, Flex, Select, Text, Transition } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { Timestamp } from 'firebase/firestore';
import { GolfScorecard } from 'src/types';
import { useCoursesCollection, useScorecardDocumentMutation } from 'src/utils';
import { ScoreInputCarousel } from '../ScoreInputCarousel';

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
  const course = courses.data.find((course) => course.id === form.values.courseId);
  const totalScore = form.values.scores.reduce((prev, current) => (typeof prev === 'string' ? parseInt(prev) : prev) + current, 0);

  const submitForm = (values: FormInputs) => {
    mutation.mutate(
      {
        timestamp: Timestamp.fromDate(values.date),
        courseId: values.courseId,
        scores: new Array(course?.holes.length || 18).fill(0).map((_, index) => values.scores[index] || 0),
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
        {course && (
          <Card shadow="sm" radius="md" withBorder p="sm">
            <Flex direction="column" gap="sm">
              {course.holes.map((hole, index) => (
                <>
                  <Flex align="center" gap="xs">
                    {`Hole ${index + 1}`}
                    <Badge color="green" variant="light">
                      Par {hole.par}
                    </Badge>
                    <Badge color="pink" variant="light">
                      {hole.yards} yards
                    </Badge>
                  </Flex>
                  <ScoreInputCarousel {...form.getInputProps(`scores.${index}`)} />
                </>
              ))}
            </Flex>
          </Card>
        )}
        <Checkbox mt="sm" label="Hide this scorecard from other players" {...form.getInputProps('hidden', { type: 'checkbox' })} />
        <Flex justify="center">
          <Button type="submit" mt="md" disabled={mutation.isLoading}>
            Update scorecard
          </Button>
        </Flex>
      </Flex>
      <Affix position={{ top: 20, left: 0 }} zIndex={202} style={{ width: '100%' }}>
        <Transition transition="slide-up" mounted={totalScore > 0}>
          {(transitionStyles) => (
            <Center>
              <Card style={transitionStyles} bg="blue.6" p="sm" px="md" shadow="sm">
                <Flex gap="xs">
                  <Text color="white">Total score:</Text>
                  <Text color="white" weight="bold">
                    {totalScore}
                  </Text>
                </Flex>
              </Card>
            </Center>
          )}
        </Transition>
      </Affix>
    </form>
  );
};
