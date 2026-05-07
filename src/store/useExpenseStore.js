import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import dayjs from 'dayjs';

const MOCK_TRANSACTIONS = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 5000,
    type: 'income',
    category: 'Salary',
    date: dayjs().startOf('month').toISOString(),
    createdAt: Date.now() - 1000000,
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 150,
    type: 'expense',
    category: 'Food',
    date: dayjs().subtract(2, 'day').toISOString(),
    createdAt: Date.now() - 800000,
  },
  {
    id: '3',
    title: 'Electricity Bill',
    amount: 120,
    type: 'expense',
    category: 'Bills',
    date: dayjs().subtract(5, 'day').toISOString(),
    createdAt: Date.now() - 700000,
  },
  {
    id: '4',
    title: 'Freelance Project',
    amount: 800,
    type: 'income',
    category: 'Freelance',
    date: dayjs().subtract(1, 'week').toISOString(),
    createdAt: Date.now() - 600000,
  },
  {
    id: '5',
    title: 'Netflix Subscription',
    amount: 15,
    type: 'expense',
    category: 'Entertainment',
    date: dayjs().subtract(10, 'day').toISOString(),
    createdAt: Date.now() - 500000,
  },
  {
    id: '6',
    title: 'Gas Refill',
    amount: 60,
    type: 'expense',
    category: 'Travel',
    date: dayjs().subtract(1, 'day').toISOString(),
    createdAt: Date.now() - 400000,
  },
  {
    id: '7',
    title: 'Gym Membership',
    amount: 50,
    type: 'expense',
    category: 'Health',
    date: dayjs().subtract(15, 'day').toISOString(),
    createdAt: Date.now() - 300000,
  }
];

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      transactions: MOCK_TRANSACTIONS,
      currency: 'USD',
      filters: {
        type: 'all',
        category: 'all',
        search: '',
      },

    
      addTransaction: (transaction) => { 
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
            },
            ...state.transactions,
          ],
        }));
      },

      setCurrency: (currency) => set({ currency }),

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      setFilter: (key, value) => {
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        }));
      },

      clearFilters: () => {
        set({
          filters: {
            type: 'all',
            category: 'all',
            search: '',
          },
        });
      },

      // Selectors (derived state)
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter((t) => {
          const matchType = filters.type === 'all' || t.type === filters.type;
          const matchCategory = filters.category === 'all' || t.category === filters.category;
          const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
          return matchType && matchCategory && matchSearch;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
      },

      getStats: () => {
        const { transactions } = get();
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        const expense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        return {
          totalIncome: income,
          totalExpense: expense,
          balance: income - expense,
        };
      },

      getExpenseByCategory: () => {
        const { transactions } = get();
        const expenses = transactions.filter((t) => t.type === 'expense');
        const grouped = expenses.reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
          return acc;
        }, {});

        return Object.keys(grouped).map((name) => ({
          name,
          value: grouped[name],
        }));
      },

      getMonthlyData: () => {
        const { transactions } = get();
        const last6Months = [];
        for (let i = 5; i >= 0; i--) {
          const month = dayjs().subtract(i, 'month');
          last6Months.push({
            month: month.format('MMM'),
            monthKey: month.format('YYYY-MM'),
            income: 0,
            expense: 0,
          });
        }

        transactions.forEach((t) => {
          const tMonth = dayjs(t.date).format('YYYY-MM');
          const monthData = last6Months.find((m) => m.monthKey === tMonth);
          if (monthData) {
            if (t.type === 'income') monthData.income += Number(t.amount);
            else monthData.expense += Number(t.amount);
          }
        });

        return last6Months;
      },
    }),
    {
      name: 'expense-tracker-data',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
