import React, { useState, useEffect } from 'react';
import styles from './filterAndSort.module.css';
import ExpenseActions from '../ExpenseActions/ExpenseActions';

// Predefined category order to be used for grouping expenses
const CATEGORY_ORDER = [
  'housing',
  'utilities',
  'grocery',
  'transportation',
  'clothing',
  'entertainment',
  'Other'
];

const FilterAndSort = ({ expenses, onEdit, onDelete }) => {
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  // useEffect hook that runs when expenses change, updating the available months
  useEffect(() => {
    const months = getUniqueMonths(expenses);
    setAvailableMonths(months);
  }, [expenses]);

  // Function to extract the month and year from a given date string
  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  // Function to get unique months from expenses and format them for display
  const getUniqueMonths = (expenses) => {
    const monthMap = new Map();
    expenses.forEach(exp => {
      if (!exp.date) return;

      const date = new Date(exp.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      if (!monthMap.has(key)) {
        const label = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        monthMap.set(key, {key, label, sortDate: new Date(year, month, 1) });
      }
    });
    return Array.from(monthMap.values())
        .sort((a, b) => a.sortDate - b.sortDate)
        .map(item => item.label); 
  };

  // Function to filter expenses based on the selected month
  const filterExpenses = (expenses, selectedMonth) => {
    return selectedMonth
      ? expenses.filter(exp => getMonthYear(exp.date) === selectedMonth)
      : expenses;
  };

  // Function to group expenses by their categories based on the predefined category order
  const groupByCategory = (expenses) => {
    const grouped = {};
    CATEGORY_ORDER.forEach(category => {
      const items = expenses
        .filter(exp => exp.category === category)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      if (items.length > 0) grouped[category] = items;
    });
    return grouped;
  };

  // Function to calculate the total amount of all filtered expenses
  const getTotalAmount = (expenses) => {
    return expenses.reduce((total, expense) => total + (Number(expense.price) || 0), 0);
  };

  // Filtering and grouping the expenses
  const filteredExpenses = filterExpenses(expenses, selectedMonth);
  const groupedExpenses = groupByCategory(filteredExpenses);
  const totalAmount = getTotalAmount(filteredExpenses);

  return (
    <div className={styles.filterAndSort}>
      <div className={styles.controls}>
        <label className={styles.filterLabel}>Filter by month:</label>
        {/* Dropdown to select the month for filtering */}
        <select className={styles.dropdownMenu} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">All months</option>
          {/* Show the available months */}
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Display the expenses, grouped by category */}
      {Object.keys(groupedExpenses).length === 0 ? (
        <p className={styles.noExpensesAlert}>No expenses to show.</p>
      ) : (
        // Render grouped expenses by category
        Object.entries(groupedExpenses).map(([category, items]) => (
          <div key={category} className={styles.categoryGroup}>
            <h2 className={styles.categoryName}>{category}</h2>
            {/* Display each expense item under the corresponding category */}
            {items.map(expense => (
              <div key={expense.id} className={styles.expenseItem}>
                <ul className={styles.liItems}>
                    <li><h4 className={styles.expenseH4}>{expense.name}</h4></li>
                    <li><p className={styles.expenseP}>Amount: ${Number(expense.price).toFixed(2)}</p></li>
                    <li><p className={styles.expenseP}>Date: {new Date (expense.date).toISOString().split("T")[0]}</p></li>
                </ul>
                
                {/* Render ExpenseActions component for editing and deleting */}
                <ExpenseActions 
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        ))
      )}

      {/* Display the total amount of the filtered expenses */}
      {filteredExpenses.length > 0 && (
        <div className={styles.totalContainer}>
          <h3 className={styles.totalAmount}>Total Expenses: ${totalAmount.toFixed(2)}</h3>
        </div>
      )};
    </div>
  );
};

export default FilterAndSort;
