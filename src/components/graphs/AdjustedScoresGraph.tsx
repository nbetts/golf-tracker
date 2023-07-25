import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { GolfScorecard } from 'src/types';
import { useCoursesCollection } from 'src/utils';
import regression from 'regression';

type DataPoint = {
  index: number;
  date: string;
  score: number;
  trend: number;
};

type AdjustedScoresGraphProps = {
  scorecards: GolfScorecard[];
};

export const AdjustedScoresGraph = ({ scorecards }: AdjustedScoresGraphProps) => {
  const courses = useCoursesCollection();
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (!courses.data) {
      return;
    }

    const scorecardsSortedByTime = scorecards.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

    const dataPoints: DataPoint[] = [];
    let newMinScore = Number.MAX_SAFE_INTEGER;
    let newMaxScore = 0;
    let scores: number[] = [];

    for (let i = 0; i < scorecardsSortedByTime.length; i++) {
      const scorecard = scorecardsSortedByTime[i];
      const dataPoint: DataPoint = {
        index: i,
        date: scorecard.timestamp.toDate().toLocaleDateString(),
        score: 0,
        trend: 0,
      };

      const course = courses.data.find(({ id }) => id === scorecard.courseId);

      if (course) {
        // Calculate the last score index so that we don't need to show any more holes after that.
        let lastScoredHole = 1;

        for (let i = 0; i < scorecard.scores.length; i++) {
          if (scorecard.scores[i] > 0) {
            lastScoredHole = i + 1;
          }
        }

        const holeCount = Math.min(lastScoredHole, course.holes.length);

        let totalPar = 0;
        let totalPlayerScore = 0;

        for (let i = 0; i < holeCount; i++) {
          totalPar += course.holes[i].par;
          totalPlayerScore += scorecard.scores[i];
        }

        const adjustedScore = Math.round((totalPlayerScore / totalPar) * 72);
        dataPoint.score = adjustedScore;
        scores[i] = adjustedScore;

        if (adjustedScore < newMinScore) {
          newMinScore = adjustedScore;
        } else if (adjustedScore > newMaxScore) {
          newMaxScore = adjustedScore;
        }
      }

      dataPoints[i] = dataPoint;
    }

    const trend = regression.linear(dataPoints.map((dataPoint, index) => [index, dataPoint.score]));

    for (let i = 0; i < dataPoints.length; i++) {
      dataPoints[i].trend = trend.points[i][1];
    }

    setData(dataPoints);
  }, [courses.data, scorecards]);

  return (
    <Flex p="lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="1 4" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} label={{ value: 'Adjusted score', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => Math.round(parseInt(value.toString()))} />
          <Line type="monotone" dataKey="score" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} strokeWidth="2" />
          <Line type="basis" dataKey="trend" stroke="#f84444" dot={false} strokeDasharray="4 6" strokeWidth="1" />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
};
