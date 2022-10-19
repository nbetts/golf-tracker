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
  id: string;
  name: string;
  website: string;
  holes: GolfHole[];
  deleted: boolean;
};

export type GolfScorecard = {
  id: string;
  courseId: string;
  userId: string;
  timestamp: Timestamp;
  scores: number[];
  hidden: boolean;
  deleted: boolean;
};

export type GolfPlayer = {
  id: string;
  name: string;
  deleted: boolean;
};
