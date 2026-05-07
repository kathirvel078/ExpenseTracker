import React from 'react';
import { Box, Typography } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
import ExpenseChart from '../components/ExpenseChart';

const Reports = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>Financial Reports</Typography>
      <SummaryCards />
      <ExpenseChart />
    </Box>
  );
};

export default Reports;
