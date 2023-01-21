import { Affix, Badge, Box, Button, Card, Center, Checkbox, Flex, NumberInput, Select, Text, Transition } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import { useCoursesCollection, useScorecardsCollectionMutation } from 'src/utils';

type FormInputs = {
  date: Date;
  courseId: string;
  scores: number[];
  hidden: boolean;
};

const initialValues: FormInputs = {
  date: new Date(),
  courseId: '',
  scores: new Array(18).fill(''),
  hidden: false,
};

export type AddScorecardModalProps = {
  userId: string;
};

export const AddScorecardModal = ({ userId }: AddScorecardModalProps) => {
  const mutation = useScorecardsCollectionMutation();
  const courses = useCoursesCollection();

  const form = useForm<FormInputs>({
    initialValues,
    validate: {
      date: (value) => (!value ? 'Date is required' : null),
      courseId: (value) => (!value ? 'Course is required' : null),
    },
  });

  useEffect(() => {
    const storedFormValues = sessionStorage.getItem('golf-tracker-add-scorecard-modal-form-inputs');

    if (storedFormValues) {
      try {
        const parsedFormValues = JSON.parse(storedFormValues);

        if (parsedFormValues) {
          form.setValues({
            ...parsedFormValues,
            date: new Date(parsedFormValues.date),
          });
        }
      } catch (error) {}
    }

    return () => {
      sessionStorage.removeItem('golf-tracker-add-scorecard-modal-form-inputs');
    };
  }, []);

  useEffect(() => {
    if (form.isValid()) {
      sessionStorage.setItem('golf-tracker-add-scorecard-modal-form-inputs', JSON.stringify(form.values));
    }
  }, [form.values]);

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
        <DatePicker label="Date" placeholder="Choose date" {...form.getInputProps('date')} maxDate={new Date()} data-autofocus autoFocus />
        {courseOptions && <Select label="Course" placeholder="Choose course" data={courseOptions} {...form.getInputProps('courseId')} />}
        {course && (
          <Card shadow="sm" radius="md" withBorder p="sm">
            <Flex direction="column" gap="sm">
              {course.holes.map((hole, index) => (
                <NumberInput
                  key={index}
                  min={0}
                  label={
                    <Flex align="center">
                      {`Hole ${index + 1}`}
                      <Badge color="green" variant="light">
                        Par {hole.par}
                      </Badge>
                      <Badge color="pink" variant="light">
                        {hole.yards} yards
                      </Badge>
                    </Flex>
                  }
                  {...form.getInputProps(`scores.${index}`)}
                />
              ))}
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
