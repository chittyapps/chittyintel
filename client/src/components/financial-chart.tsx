import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartArea } from "lucide-react";

interface FinancialData {
  capitalContributions: Array<{ date: string; amount: number }>;
  outstandingObligations: Array<{ date: string; amount: number }>;
}

interface FinancialChartProps {
  data: FinancialData;
}

export function FinancialChart({ data }: FinancialChartProps) {
  // Combine the data for the chart
  const chartData = data.capitalContributions.map((contribution, index) => ({
    date: contribution.date,
    contributions: contribution.amount,
    obligations: data.outstandingObligations[index]?.amount || 0
  }));

  const formatCurrency = (value: number) => {
    return `$${(value / 1000)}K`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Financial Flow Analysis</h3>
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <ChartArea className="text-green-600" size={16} />
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === 'contributions' ? 'Capital Contributions' : 'Outstanding Obligations'
              ]}
              labelStyle={{ color: '#374151' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="contributions"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#contributionsGradient)"
              dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#4F46E5', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="obligations"
              stroke="#EF4444"
              strokeWidth={3}
              fill="url(#obligationsGradient)"
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="contributionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="obligationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm">
        <div className="text-center">
          <div className="font-semibold text-gray-900">$120K</div>
          <div className="text-gray-500">Initial Capital</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">$302K</div>
          <div className="text-gray-500">Total Contributions</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-900">$100K</div>
          <div className="text-gray-500">Active Loan</div>
        </div>
      </div>
    </div>
  );
}
