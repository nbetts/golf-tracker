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
  name: string;
  website: string;
  holes: GolfHole[];
};

export type GolfScorecard = {
  courseId: string;
  userId: string;
  timestamp: Timestamp;
  scores: number[];
  private: boolean;
};

export type GolfPlayer = {
  name: string;
};
