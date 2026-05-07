import React from 'react';
import { Grid, Paper, Typography, Box, Skeleton } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as BalanceIcon,
} from '@mui/icons-material';
import { useExpenseStore } from '../store/useExpenseStore';
import { formatCurrency } from '../utils/formatCurrency';

const SummaryCard = ({ title, amount, color, icon: Icon, loading, currency }) => (
  <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: `${color}.light`,
          color: `${color}.main`,
          display: 'flex',
          opacity: 0.8,
        }}
      >
        <Icon />
      </Box>
    </Box>
    <Typography variant="body2" color="text.secondary" fontWeight={600} gutterBottom>
      {title}
    </Typography>
    {loading ? (
      <Skeleton width="60%" height={40} />
    ) : (
      <Typography variant="h4" fontWeight={800} color={`${color}.main`}>
        {formatCurrency(amount, currency)}
      </Typography>
    )}
  </Paper>
);

const SummaryCards = () => {
  const stats = useExpenseStore((state) => state.getStats());
  const currency = useExpenseStore((state) => state.currency);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <SummaryCard
          title="Total Balance"
          amount={stats.balance}
          color="primary"
          icon={BalanceIcon}
          loading={loading}
          currency={currency}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SummaryCard
          title="Total Income"
          amount={stats.totalIncome}
          color="success"
          icon={TrendingUpIcon}
          loading={loading}
          currency={currency}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SummaryCard
          title="Total Expenses"
          amount={stats.totalExpense}
          color="error"
          icon={TrendingDownIcon}
          loading={loading}
          currency={currency}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(SummaryCards);
