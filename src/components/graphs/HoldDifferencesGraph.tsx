import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataPoint = {
  difference: string;
  amount: number;
};

type HoleDifferencesGraphProps = {
  holeDifferences: Record<string, number>;
};

export const HoleDifferencesGraph = ({ holeDifferences }: HoleDifferencesGraphProps) => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    setData(
      Object.entries(holeDifferences)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => {
          return {
            difference: key === '+0' ? 'par' : key,
            amount: value,
          };
        }),
    );
  }, [holeDifferences]);

  return (
    <Flex p="lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="1 4" />
          <XAxis dataKey="difference" />
          <YAxis domain={['auto', 'auto']} label={{ value: 'Amount', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => Math.round(parseInt(value.toString()))} />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
};
