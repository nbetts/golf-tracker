import { Button, Card, Flex, Grid, NumberInput, SegmentedControl, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useEffect } from 'react';
import { GolfHole } from 'src/types';
import { useCoursesCollectionMutation } from 'src/utils';

// @ts-ignore allow hole data to be blank
const initialHoleData: GolfHole[] = new Array(18).fill(0).map(() => ({ par: '', strokeIndex: '', yards: '' }));
const holeCount = ['9 holes', '18 holes'];

type FormInputs = {
  name: string;
  website: string;
  holeCount: '9 holes' | '18 holes';
  holes: GolfHole[];
};

export const AddCourseModal = () => {
  const mutation = useCoursesCollectionMutation();

  const form = useForm<FormInputs>({
    initialValues: {
      name: '',
      website: '',
      holeCount: '9 holes',
      holes: initialHoleData,
    },
    validate: {
      name: (value) => (/^.{1,100}$/.test(value) ? null : 'Name must be 1-100 characters'),
      website: (value) => (/^.{0,100}$/.test(value) ? null : 'Website must be 0-100 characters'),
      holes: {
        par: (value) => (value >= 0 ? null : 'Cannot be negative'),
        strokeIndex: (value) => (value >= 0 ? null : 'Cannot be negative'),
        yards: (value) => (value >= 0 ? null : 'Cannot be negative'),
      },
    },
  });

  useEffect(() => {
    const storedFormValues = localStorage.getItem('golf-tracker-add-course-modal-form-inputs');

    if (storedFormValues) {
      try {
        const parsedFormValues = JSON.parse(storedFormValues);

        if (parsedFormValues) {
          form.setValues(parsedFormValues);
        } else {
          localStorage.removeItem('golf-tracker-add-course-modal-form-inputs');
        }
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    if (form.isValid()) {
      localStorage.setItem('golf-tracker-add-course-modal-form-inputs', JSON.stringify(form.values));
    }
  }, [form.values]);

  const holesToDisplay = form.values.holes.slice(0, form.values.holeCount === '9 holes' ? 9 : 18);

  const holeFields = holesToDisplay.map((_item, index) => (
    <Card key={index} shadow="sm" radius="md" withBorder p="sm">
      <Text size="sm" weight={500}>
        Hole {index + 1}
      </Text>
      <Grid align="center" grow>
        <Grid.Col span={4}>
          <NumberInput min={0} label="Par" {...form.getInputProps(`holes.${index}.par`)} />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput min={0} label="Yards" {...form.getInputProps(`holes.${index}.yards`)} />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput min={0} label="S. index" {...form.getInputProps(`holes.${index}.strokeIndex`)} />
        </Grid.Col>
      </Grid>
    </Card>
  ));

  const submitForm = (values: FormInputs) => {
    mutation.mutate(
      {
        name: values.name,
        website: values.website,
        holes: values.holes.slice(0, values.holeCount === '9 holes' ? 9 : 18).map((hole) => ({
          par: hole.par || 0,
          strokeIndex: hole.strokeIndex || 0,
          yards: hole.yards || 0,
        })),
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
        <TextInput label="Name" placeholder="Augusta National Golf Club" {...form.getInputProps('name')} data-autofocus />
        <TextInput label="Website" placeholder="https://example.com/" {...form.getInputProps('website')} />
        <SegmentedControl mt="xs" {...form.getInputProps('holeCount')} data={holeCount.map((value) => ({ value, label: value }))} />
        {holeFields}
        <Flex justify="center">
          <Button type="submit" mt="md" disabled={mutation.isLoading}>
            Add course
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
