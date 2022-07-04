import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NumberFormater } from '../../../common/utils';
import { CustomTooltip } from './BarChartHelpers';

const RulesetSummaryChart = (props: any) => {
  const { rulesetSummary, setRuleName } = props;

  const setSelectedRuleName = ({ active, payload, label }: any) => {
    setRuleName(payload.name);
  };

  return (
    <ResponsiveContainer aspect={16 / 16} width="100%" maxHeight={280}>
      <BarChart data={rulesetSummary}>
        <XAxis dataKey="rulesSet" axisLine={false} />
        <YAxis tickFormatter={NumberFormater} />
        <Tooltip content={CustomTooltip} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Bar dataKey="totalCount" stackId="a" fill="#FF9F40" barSize={25} onClick={setSelectedRuleName} />
        <Bar dataKey="usedCount" stackId="a" fill="#5388D8" barSize={25} onClick={setSelectedRuleName} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RulesetSummaryChart;
