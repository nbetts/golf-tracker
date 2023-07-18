import { GolfCourse, GolfScorecard } from 'src/types';

export const calculateAdjustedScore = (scorecard: GolfScorecard, course: GolfCourse) => {
  const { scores } = scorecard;
  const { holes } = course;

  // Calculate the last score index so that we don't need to account for any more holes after that.
  let lastScoredHole = 1;

  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > 0) {
      lastScoredHole = i + 1;
    }
  }

  const holeCount = Math.min(lastScoredHole, holes.length);
  let netPlayerScore = 0;
  let netPar = 0;

  for (let i = 0; i < holeCount; i++) {
    netPlayerScore += scores[i];
    netPar += holes[i].par;
  }

  return Math.round((netPlayerScore / netPar) * 72);
};
