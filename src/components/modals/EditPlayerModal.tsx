import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals } from '@mantine/modals';
import { usePlayerDocumentMutation } from 'src/utils/firebase';
import { GolfPlayer } from 'src/utils/types';

type FormInputs = {
  name: string;
};

export type EditPlayerModalProps = {
  player: GolfPlayer;
};

const EditPlayerModal = ({ player }: EditPlayerModalProps) => {
  const mutation = usePlayerDocumentMutation(player.id);

  const form = useForm<FormInputs>({
    initialValues: {
      name: player.name,
    },
    validate: {
      name: (value) => (/^.{1,100}$/.test(value) ? null : 'Name must be 1-100 characters'),
    },
  });

  const submitForm = (values: FormInputs) => {
    mutation.mutate(
      {
        name: values.name,
      },
      {
        onSuccess: () => closeAllModals(),
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Flex direction="column">
        <TextInput label="Name" placeholder="Your name" {...form.getInputProps('name')} data-autofocus />
        <Button type="submit" mt="md" disabled={mutation.isLoading}>
          Update profile
        </Button>
      </Flex>
    </form>
  );
};

export default EditPlayerModal;
