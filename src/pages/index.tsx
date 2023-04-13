import { Button, Flex, PasswordInput, Text, TextInput, createStyles } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Layout } from 'src/components';
import { useSignIn, withoutAuthCheck } from 'src/utils';

type FormInputs = {
  email: string;
  password: string;
};

const Home = () => {
  const signIn = useSignIn();
  const { classes } = useStyles();

  const form = useForm<FormInputs>({
    validate: {
      email: (value) => (!value ? 'Email is required' : null),
      password: (value) => (!value ? 'Password is required' : null),
    },
  });

  const submitForm = ({ email, password }: FormInputs) => {
    signIn.mutate(
      { email, password },
      {
        onError: (data) => {
          if (data.code === 'auth/user-not-found' || data.code === 'auth/wrong-password') {
            form.setFieldError('password', 'Incorrect email or password');
          } else {
            form.setFieldError('password', 'Unable to sign in at this time');
          }
        },
      },
    );
  };

  return (
    <Layout>
      <Flex direction="column" className={classes.container}>
        <Text size={30} weight="bold" mb="sm">
          Sign in
        </Text>
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput label="Email" {...form.getInputProps('email')} data-autofocus />
          <PasswordInput label="Password" {...form.getInputProps('password')} mt="md" />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Flex>
    </Layout>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.largerThan('xs')]: {
      alignSelf: 'center',
      width: '400px',
    },
  },
}));

export default withoutAuthCheck(Home);
