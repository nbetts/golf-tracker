import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const namedDifferences = ['eagles', 'birdies', 'pars', 'bogeys', 'double bogeys', 'triple bogeys'];

type DataPoint = {
  index: string;
  score: number;
};

type HoleDifferencesGraphProps = {
  holeDifferences: number[];
  holeDifferenceArrayIndexOffset: number;
};

export const HoleDifferencesGraph = ({ holeDifferences, holeDifferenceArrayIndexOffset }: HoleDifferencesGraphProps) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    let highestIndex = 0;

    holeDifferences.forEach((_, index) => {
      if (index > highestIndex) {
        highestIndex = index;
      }
    });

    const dataPoints: DataPoint[] = [];

    for (let i = 0; i <= highestIndex; i++) {
      dataPoints[i] = {
        index: namedDifferences[i] || `+${i - holeDifferenceArrayIndexOffset}`,
        score: holeDifferences[i] || 0,
      };
    }

    setData(dataPoints);
  }, [holeDifferences, holeDifferenceArrayIndexOffset]);

  return (
    <Flex p="lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="1 4" />
          <XAxis dataKey="index" />
          <YAxis domain={['auto', 'auto']} label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => Math.round(parseInt(value.toString()))} />
          <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};
