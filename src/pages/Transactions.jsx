import React from 'react';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import CategoryFilter from '../components/CategoryFilter';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Transactions = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>Transactions</Typography>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <CategoryFilter />
          <TransactionForm />
        </Grid>
        <Grid xs={12} md={8}>
          <TransactionList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Transactions;
