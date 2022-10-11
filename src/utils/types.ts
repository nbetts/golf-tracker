import { Timestamp } from 'firebase/firestore';

export type GolfHole = {
  par: number;
  strokeIndex: number;
  yards: number;
};

export type ScoredGolfHole = {
  score: number;
} & GolfHole;

export type GolfCourse = {
  name: string; // Acts as the ID
  website: string;
  holes: GolfHole[];
};

export type GolfCourses = {
  [key: string]: GolfCourse;
};

export type GolfScorecard = {
  courseId: string;
  timestamp: Timestamp;
  scores: number[];
};

export type GolfScorecards = {
  [key: string]: GolfScorecard;
};

export type GolfPlayer = {
  userId: string;
  name: string;
  scorecards: GolfScorecards;
};

export type GolfPlayers = {
  [key: string]: GolfPlayer;
};
