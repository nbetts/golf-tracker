import { Button, Card, Grid, NumberInput, SegmentedControl, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useCourseDocumentMutation } from 'src/utils/firebase';
import { GolfCourse, GolfHole } from 'src/utils/types';

const holeCount = ['9 holes', '18 holes'];

type FormInputs = {
  name: string;
  website: string;
  holeCount: '9 holes' | '18 holes';
  holes: GolfHole[];
};

export type EditCourseModalProps = {
  course: GolfCourse;
};

const EditCourseModal = ({ course }: EditCourseModalProps) => {
  const mutation = useCourseDocumentMutation(course.id);

  const form = useForm<FormInputs>({
    initialValues: {
      name: course.name,
      website: course.website,
      holeCount: course.holes.slice(9).reduce((sum, { par }) => par + sum, 0) > 0 ? '18 holes' : '9 holes',
      holes: course.holes,
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

  const holesToDisplay = form.values.holes.slice(0, form.values.holeCount === '9 holes' ? 9 : 18);

  const holeFields = holesToDisplay.map((_item, index) => (
    <Card key={index} shadow="sm" radius="md" withBorder p="sm">
      <Text size="xs" weight={500}>
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
        holes: values.holes,
      },
      {
        onSuccess: () => closeAllModals(),
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Stack>
        <TextInput label="Name" placeholder="Augusta National Golf Club" {...form.getInputProps('name')} data-autofocus />
        <TextInput label="Website" placeholder="https://example.com/" {...form.getInputProps('website')} />
        <SegmentedControl mt="xs" {...form.getInputProps('holeCount')} data={holeCount.map((value) => ({ value, label: value }))} />
        {holeFields}
        <Button type="submit" mt="md" disabled={mutation.isLoading}>
          Update course
        </Button>
      </Stack>
    </form>
  );
};

export default EditCourseModal;
