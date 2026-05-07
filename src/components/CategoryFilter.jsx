import React from 'react';
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useExpenseStore } from '../store/useExpenseStore';

const CATEGORIES = [
  'Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Health', 'Education', 'Salary', 'Freelance', 'Investment', 'Gift', 'Other'
];

const CategoryFilter = () => {
  const filters = useExpenseStore((state) => state.filters);
  const setFilter = useExpenseStore((state) => state.setFilter);
  const clearFilters = useExpenseStore((state) => state.clearFilters);

  const hasActiveFilters = filters.type !== 'all' || filters.category !== 'all' || filters.search !== '';

  return (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon color="primary" fontSize="small" />
            <Typography variant="h6" fontWeight={700}>
              Filters
            </Typography>
          </Box>
          {hasActiveFilters && (
            <Button
              size="small"
              startIcon={<CloseIcon />}
              onClick={clearFilters}
              color="error"
              sx={{ fontWeight: 600 }}
            >
              Clear
            </Button>
          )}
        </Box>

        <TextField
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1, display: 'block' }}>
              TRANSACTION TYPE
            </Typography>
            <ToggleButtonGroup
              value={filters.type}
              exclusive
              onChange={(_, val) => val && setFilter('type', val)}
              size="small"
              fullWidth
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="income">Income</ToggleButton>
              <ToggleButton value="expense">Expense</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ mb: 1, display: 'block' }}>
              CATEGORY
            </Typography>
            <TextField
              select
              size="small"
              value={filters.category}
              onChange={(e) => setFilter('category', e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All Categories</MenuItem>
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CategoryFilter;
