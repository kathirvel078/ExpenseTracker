import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReceiptLong as ReceiptIcon } from '@mui/icons-material';

const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 90,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <ReceiptIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.5 }} />
      </Box>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {message || "No transactions found"}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
        Start tracking your expenses by adding your first transaction.
      </Typography>
      {actionLabel && (
        <Button variant="outlined" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
