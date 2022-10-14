import type { User } from 'firebase/auth';
import { Store } from 'pullstate';
import { GolfCourse, GolfPlayer, GolfScorecard } from './types';

type StoreProps = {
  appLoaded: boolean;
  user: User | null;
  courses: Record<string, GolfCourse>;
  players: Record<string, GolfPlayer>;
  scorecards: Record<string, GolfScorecard>;
};

const store = new Store<StoreProps>({
  appLoaded: false,
  user: null,
  courses: {},
  players: {},
  scorecards: {},
});

export default store;
