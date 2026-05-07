export const CATEGORY_COLORS = {
  // Expenses
  Food: '#FF7043',
  Travel: '#42A5F5',
  Bills: '#AB47BC',
  Shopping: '#26A69A',
  Entertainment: '#FFA726',
  Health: '#EC407A',
  Education: '#5C6BC0',
  Other: '#78909C',
  // Income
  Salary: '#66BB6A',
  Freelance: '#4DB6AC',
  Investment: '#7986CB',
  Gift: '#F06292',
};

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
};
