import { Text } from '@mantine/core';
import Layout from 'src/components/Layout';
import { withoutAuthCheck } from 'src/utils/withRouteCheck';

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
