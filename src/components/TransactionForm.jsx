import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Box,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useExpenseStore } from '../store/useExpenseStore';

const CATEGORIES = {
  expense: ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Education', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
};

const TransactionForm = () => {
  const addTransaction = useExpenseStore((state) => state.addTransaction);
  const currency = useExpenseStore((state) => state.currency);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: dayjs(),
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 2) newErrors.title = 'Title must be at least 2 chars';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Amount must be > 0';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date || formData.date.isAfter(dayjs())) newErrors.date = 'Cannot be in future';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category if type changes
      ...(name === 'type' ? { category: '' } : {}),
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      date: formData.date.toISOString(),
    });

    // Reset form
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      date: dayjs(),
    });
    setLoading(false);
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom fontWeight={700}>
        Add Transaction
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Transaction Title"
              placeholder="e.g. Monthly Rent"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: <InputAdornment position="start">{currency === 'USD' ? '$' : currency}</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="type"
              label="Type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              required
            >
              {CATEGORIES[formData.type].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newValue) => {
                  setFormData((prev) => ({ ...prev, date: newValue }));
                  setErrors((prev) => ({ ...prev, date: null }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date,
                    helperText: errors.date,
                  }, //customize texfield
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              loading={loading}
              sx={{ py: 1.5, mt: 1, fontSize: '1rem' }}
            >
              Save Transaction
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TransactionForm;
