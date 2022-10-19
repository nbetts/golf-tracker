import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { usePlayerDocumentMutation } from 'src/utils/firebase';

type FormInputs = {
  name: string;
};

export type AddPlayerModalProps = {
  userId: string;
  name: string | null;
};

const AddPlayerModal = ({ userId, name }: AddPlayerModalProps) => {
  const mutation = usePlayerDocumentMutation(userId);

  const form = useForm<FormInputs>({
    initialValues: {
      name: name || '',
    },
    validate: {
      name: (value) => (/^.{1,100}$/.test(value) ? null : 'Name must be 1-100 characters'),
    },
  });

  const submitForm = (values: FormInputs) => {
    mutation.mutate({
      name: values.name,
      deleted: false,
    });
    closeAllModals();
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Stack>
        <TextInput label="Name" placeholder="Your name" {...form.getInputProps('name')} data-autofocus />
        <Button type="submit" mt="md" disabled={mutation.isLoading}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default AddPlayerModal;
