import React from 'react';
import ExpenseList from '../ExpenseList/ExpenseList';

const GroupedExpenses = ({ expenses }) => {
  const groupedByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedByCategory).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          <ExpenseList expenses={groupedByCategory[category]} />
        </div>
      ))}
    </div>
  );
};

export default GroupedExpenses;
