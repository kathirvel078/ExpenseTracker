import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  useTheme,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { useExpenseStore } from '../store/useExpenseStore';
import { CATEGORY_COLORS } from '../utils/categoryColors';
import { formatCurrency, formatCompactNumber } from '../utils/formatCurrency';

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        sx={{
          p: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 0.5, display: 'block' }}>
          {label || payload[0].name}
        </Typography>
        {payload.map((entry, index) => (
          <Typography
            key={index}
            variant="body2"
            fontWeight={800}
            sx={{ color: entry.color || entry.fill }}
          >
            {formatCurrency(entry.value, currency)}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

const ExpenseChart = () => {
  const theme = useTheme();
  const expenseByCategory = useExpenseStore((state) => state.getExpenseByCategory());
  const monthlyData = useExpenseStore((state) => state.getMonthlyData());
  const currency = useExpenseStore((state) => state.currency);

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Pie Chart */}
      <Grid item xs={12} lg={5}>
        <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Expenses by Category
          </Typography>
          <Box sx={{ height: 300, width: '100%', mt: 2 }}>
            {expenseByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || theme.palette.primary.main} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip currency={currency} />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">No expense data available</Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Bar Chart */}
      <Grid item xs={12} lg={7}>
        <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Monthly Summary
          </Typography>
          <Box sx={{ height: 300, width: '100%', mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(val) => formatCompactNumber(val)}
                />
                <RechartsTooltip content={<CustomTooltip currency={currency} />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Bar
                  dataKey="income"
                  fill={theme.palette.success.main}
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                  name="Income"
                />
                <Bar
                  dataKey="expense"
                  fill={theme.palette.error.main}
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                  name="Expense"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ExpenseChart;
