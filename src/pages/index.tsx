import { Text } from '@mantine/core';
import { Layout } from 'src/components';
import { withoutAuthCheck } from 'src/utils';

const Home = () => {
  return (
    <Layout>
      <Text size={30} weight="bold" mb="sm">
        Home
      </Text>
      <Text>To do</Text>
    </Layout>
  );
};

export default withoutAuthCheck(Home);
