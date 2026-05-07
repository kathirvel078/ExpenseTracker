import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import { useExpenseStore } from '../store/useExpenseStore';

const Settings = () => {
  const currency = useExpenseStore((state) => state.currency);
  const setCurrency = useExpenseStore((state) => state.setCurrency);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>Settings</Typography>
      
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              General Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Configure your global application preferences.
            </Typography>
            
            <Grid container spacing={3} alignItems="center">
              <Grid xs={12} sm={6}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Display Currency
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All amounts will be formatted in this currency.
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value="USD">USD - US Dollar ($)</MenuItem>
                  <MenuItem value="INR">INR - Indian Rupee (₹)</MenuItem>
                  <MenuItem value="EUR">EUR - Euro (€)</MenuItem>
                  <MenuItem value="GBP">GBP - British Pound (£)</MenuItem>
                  <MenuItem value="JPY">JPY - Japanese Yen (¥)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
          
          <Divider />
          
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Data Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your data is stored locally in your browser's local storage.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
