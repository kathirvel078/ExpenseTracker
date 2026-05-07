import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Paper,
  Box,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Pagination,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import { useExpenseStore } from '../store/useExpenseStore';
import { formatCurrency } from '../utils/formatCurrency';
import { getCategoryColor } from '../utils/categoryColors';
import dayjs from 'dayjs';
import EmptyState from './EmptyState';

const TransactionList = () => {
  const transactions = useExpenseStore((state) => state.getFilteredTransactions());
  const deleteTransaction = useExpenseStore((state) => state.deleteTransaction);
  const currency = useExpenseStore((state) => state.currency);
  
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedItems = transactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTransaction(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
    // Adjust page if current page becomes empty
    if (paginatedItems.length === 1 && page > 1) {
      setPage(page - 1);
    }
  };

  if (transactions.length === 0) {
    return (
      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <EmptyState message="No transactions match your filters" />
      </Paper>
    );
  }

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="h6" fontWeight={700}>
            Transactions
          </Typography>
          <Chip
            label={transactions.length}
            size="small"
            color="primary"
            sx={{ fontWeight: 700, borderRadius: 2 }}
          />
        </Box>
      </Box>

      <List sx={{ p: 0, maxHeight: 600, overflowY: 'auto' }}>
        {paginatedItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              sx={{
                py: 2,
                px: 3,
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              secondaryAction={
                <Tooltip title="Delete transaction">
                  <IconButton edge="end" onClick={() => handleDeleteClick(item.id)} size="small">
                    <DeleteIcon fontSize="small" sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }} />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: getCategoryColor(item.category),
                    width: 42,
                    height: 42,
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {item.category.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Box component="span" sx={{ fontSize: '1rem', fontWeight: 600, display: 'block' }}>
                    {item.title}
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      {dayjs(item.date).format('MMM DD, YYYY')}
                    </Box>
                    <DotIcon sx={{ fontSize: 6, color: 'text.disabled' }} />
                    <Box component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      {item.category}
                    </Box>
                  </Box>
                }
              />
              <Box sx={{ mr: 2, textAlign: 'right' }}>
                <Box
                  component="span"
                  sx={{ 
                    fontSize: '1rem',
                    fontWeight: 700, 
                    color: item.type === 'income' ? 'success.main' : 'error.main' 
                  }}
                >
                  {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount, currency)}
                </Box>
              </Box>
            </ListItem>
            {index < paginatedItems.length - 1 && <Divider component="li" sx={{ mx: 3 }} />}
          </React.Fragment>
        ))}
      </List>

      {totalPages > 1 && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
            size="medium"
          />
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setConfirmOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default React.memo(TransactionList);
