import React from 'react';
import { Unstable_Grid2 as Grid, Typography } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
// import ExpenseChart from '../components/ExpenseChart';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>Dashboard</Typography>
        <SummaryCards />
        {/* <ExpenseChart /> */}
        <TransactionList />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
