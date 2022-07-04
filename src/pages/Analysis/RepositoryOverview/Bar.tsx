import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const RepositoryBar = (props: any) => {
  const { repositoryOverviewData } = props;

  return (
    <ResponsiveContainer width="100%" height="100%" aspect={16 / 9}>
      <BarChart
        width={600}
        height={300}
        data={repositoryOverviewData.objectTypeCounts}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="objectType" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend />
        <Bar stackId="v" dataKey="totalCount" fill="#FF9F40" />
        <Bar stackId="v" dataKey="usedCount" fill="#5388D8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RepositoryBar;
