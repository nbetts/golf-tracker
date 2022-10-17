import { Button, Card, Grid, NumberInput, SegmentedControl, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { useCoursesCollectionMutation } from 'src/utils/firebase';
import { GolfHole } from 'src/utils/types';

const holeCount = ['9 holes', '18 holes'];
const initialHoleData: GolfHole[] = new Array(18).fill(0).map(() => ({ par: 0, strokeIndex: 0, yards: 0 }));

type FormInputs = {
  name: string;
  website: string;
  holeCount: '9 holes' | '18 holes';
  holes: GolfHole[];
};

const AddCourseModal = () => {
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

  const holesToDisplay = form.values.holes.slice(0, form.values.holeCount === '9 holes' ? 9 : 18);

  const holeFields = holesToDisplay.map((_item, index) => (
    <Card key={index} shadow="sm" radius="md" withBorder p="sm">
      <Grid align="center" grow>
        <Grid.Col span={2}>
          <Text size="sm" weight={500}>
            Hole {index + 1}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput size="xs" min={0} label="Par" {...form.getInputProps(`holes.${index}.par`)} />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput size="xs" min={0} label="Stroke index" {...form.getInputProps(`holes.${index}.strokeIndex`)} />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput size="xs" min={0} label="Yards" {...form.getInputProps(`holes.${index}.yards`)} />
        </Grid.Col>
      </Grid>
    </Card>
  ));

  const createCourse = (values: FormInputs) => {
    mutation.mutate({
      id: '',
      name: values.name,
      website: values.website,
      holes: values.holes.slice(0, values.holeCount === '9 holes' ? 9 : 18),
      deleted: false,
    });
    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(createCourse)}>
      <Stack>
        <TextInput label="Name" placeholder="Augusta National Golf Club" {...form.getInputProps('name')} data-autofocus />
        <TextInput label="Website" placeholder="https://example.com/" {...form.getInputProps('website')} />
        <SegmentedControl mt="xs" {...form.getInputProps('holeCount')} data={holeCount.map((value) => ({ value, label: value }))} />
        {holeFields}
        <Button type="submit" mt="md" disabled={mutation.isLoading}>
          Add course
        </Button>
      </Stack>
    </form>
  );
};

export default AddCourseModal;
