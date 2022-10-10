import { Store } from 'pullstate';
import { GolfCourse, GolfPlayer, User } from './types';

export const exampleGolfCourse: GolfCourse = {
  name: 'Yarrow Valley Golf Course',
  website: 'http://www.yarrowvalleygolf.co.uk/',
  holes: [
    { par: 3, strokeIndex: 17, yards: 141 },
    { par: 4, strokeIndex: 7, yards: 285 },
    { par: 3, strokeIndex: 3, yards: 153 },
    { par: 3, strokeIndex: 9, yards: 154 },
    { par: 3, strokeIndex: 13, yards: 160 },
    { par: 3, strokeIndex: 11, yards: 143 },
    { par: 3, strokeIndex: 15, yards: 175 },
    { par: 3, strokeIndex: 1, yards: 180 },
    { par: 3, strokeIndex: 5, yards: 160 },
    { par: 3, strokeIndex: 18, yards: 141 },
    { par: 4, strokeIndex: 8, yards: 285 },
    { par: 3, strokeIndex: 4, yards: 153 },
    { par: 3, strokeIndex: 10, yards: 154 },
    { par: 3, strokeIndex: 14, yards: 160 },
    { par: 3, strokeIndex: 12, yards: 143 },
    { par: 3, strokeIndex: 16, yards: 175 },
    { par: 3, strokeIndex: 2, yards: 180 },
    { par: 3, strokeIndex: 6, yards: 160 },
  ],
};

export const exampleGolfPlayer: GolfPlayer = {
  user: {
    email: 'ahorsefighter@gmail.com',
    name: 'Amy Horsefighter',
  },
  scorecards: [
    {
      date: new Date(2022, 11, 13),
      courseName: 'Yarrow Valley Golf Course',
      scores: [5, 8, 7, 5, 5, 6, 5, 3, 6, 5, 7, 5, 4, 4, 5, 6, 4, 4],
    },
    {
      date: new Date(2022, 11, 10),
      courseName: 'Yarrow Valley Golf Course',
      scores: [5, 8, 7, 5, 5, 6, 5, 3, 6, 5, 7, 5, 4, 4, 5, 6, 4, 4],
    },
  ],
};

type StoreProps = {
  golfCourses: GolfCourse[];
  golfPlayers: GolfPlayer[];
  user?: User;
};

const store = new Store<StoreProps>({
  golfCourses: [exampleGolfCourse],
  golfPlayers: [exampleGolfPlayer],
});

export default store;
