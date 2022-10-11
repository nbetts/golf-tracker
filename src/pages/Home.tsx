import { Text } from '@mantine/core';
import withRouteCheck from '../../src/utils/withRouteCheck';

const Home = () => {
  return (
    <>
      <Text size={30} weight="bold" mb="sm">
        Home
      </Text>
      <Text>To do</Text>
    </>
  );
};

export default withRouteCheck(Home, 'signed-out');
