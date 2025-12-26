import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { DimensionScores } from '../types';
import { DIMENSION_LABELS } from '../constants';
import { getScoreColor } from '../utils/scoring';

interface DimensionChartProps {
  scores: DimensionScores;
}

const colorMap = {
  green: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
};

export function DimensionChart({ scores }: DimensionChartProps) {
  const data = Object.entries(scores).map(([dimension, score]) => ({
    dimension: DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS],
    shortName: dimension.charAt(0).toUpperCase() + dimension.slice(1),
    score,
    color: colorMap[getScoreColor(score)],
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            type="category"
            dataKey="shortName"
            width={80}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Score']}
            labelFormatter={(label) => data.find((d) => d.shortName === label)?.dimension}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DimensionChart;
