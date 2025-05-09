import React from 'react';
import ExpenseList from '../ExpenseList/ExpenseList';

// GroupedExpenses component to display expenses grouped by their category
const GroupedExpenses = ({ expenses }) => {
  // Grouping the expenses by category using reduce
  const groupedByCategory = expenses.reduce((acc, expense) => {
    // If the category doesn't exist in the accumulator, create an empty array for it
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    // Push the current expense into the array for that category
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div>
      {/* Iterating over each category key in the groupedByCategory object */}
      {Object.keys(groupedByCategory).map((category) => (
        <div key={category}>
          {/* Displaying the category name */}
          <h2>{category}</h2>
          {/* Rendering the ExpenseList component, passing the expenses for the current category */}
          <ExpenseList expenses={groupedByCategory[category]} />
        </div>
      ))}
    </div>
  );
};

export default GroupedExpenses;
