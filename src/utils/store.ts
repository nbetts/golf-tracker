import { Store } from 'pullstate';
import { GolfCourse, GolfPlayer, User } from './types';

export const exampleGolfCourses: GolfCourse[] = [
  {
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
  },
  {
    name: 'The Laurels',
    website: 'https://thelaurelsatcharnock.co.uk/',
    holes: [
      { par: 4, strokeIndex: 7, yards: 360 },
      { par: 4, strokeIndex: 13, yards: 288 },
      { par: 5, strokeIndex: 17, yards: 432 },
      { par: 3, strokeIndex: 11, yards: 194 },
      { par: 5, strokeIndex: 1, yards: 480 },
      { par: 5, strokeIndex: 9, yards: 443 },
      { par: 4, strokeIndex: 5, yards: 398 },
      { par: 3, strokeIndex: 15, yards: 152 },
      { par: 4, strokeIndex: 3, yards: 371 },
      { par: 4, strokeIndex: 8, yards: 360 },
      { par: 4, strokeIndex: 14, yards: 288 },
      { par: 5, strokeIndex: 18, yards: 432 },
      { par: 3, strokeIndex: 12, yards: 194 },
      { par: 5, strokeIndex: 2, yards: 480 },
      { par: 5, strokeIndex: 10, yards: 443 },
      { par: 4, strokeIndex: 6, yards: 398 },
      { par: 3, strokeIndex: 16, yards: 152 },
      { par: 4, strokeIndex: 4, yards: 371 },
    ],
  },
];

export const exampleGolfPlayers: GolfPlayer[] = [
  {
    user: {
      email: 'ahorsefighter@gmail.com',
      name: 'Amy Horsefighter',
    },
    scorecards: [
      {
        date: new Date(2022, 9, 9),
        courseName: 'Yarrow Valley Golf Course',
        scores: [5, 8, 7, 5, 5, 6, 5, 3, 6, 5, 7, 5, 4, 4, 5, 6, 4, 4],
      },
      {
        date: new Date(2022, 8, 25),
        courseName: 'The Laurels',
        scores: [9, 7, 7, 5, 11, 8, 9, 4, 6],
      },
    ],
  },
  {
    user: {
      email: 'johnsmith@gmail.com',
      name: 'John Smith',
    },
    scorecards: [
      {
        date: new Date(2022, 6, 10),
        courseName: 'Yarrow Valley Golf Course',
        scores: [5, 8, 7, 5, 5, 6, 5, 3, 6, 5, 7, 5, 4, 4, 5, 6, 4, 4],
      },
      {
        date: new Date(2022, 3, 4),
        courseName: 'The Laurels',
        scores: [9, 7, 7, 5, 11, 8, 9, 4, 6, 9, 7, 7, 5, 11, 8, 9, 4, 6],
      },
    ],
  },
];

type StoreProps = {
  golfCourses: GolfCourse[];
  golfPlayers: GolfPlayer[];
  user?: User;
};

const store = new Store<StoreProps>({
  golfCourses: exampleGolfCourses,
  golfPlayers: exampleGolfPlayers,
});

export default store;
