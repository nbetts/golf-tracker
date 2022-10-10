export type User = {
  email: string; // Acts as the ID
  name: string;
};

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

export type GolfScorecard = {
  date: Date;
  courseName: string;
  scores: number[];
};

export type GolfPlayer = {
  user: User;
  scorecards: GolfScorecard[];
};
