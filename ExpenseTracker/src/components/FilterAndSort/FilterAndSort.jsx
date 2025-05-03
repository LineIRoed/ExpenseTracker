import React, { useState, useEffect } from 'react';
import styles from './filterAndSort.module.css';
import ExpenseActions from '../ExpenseActions/ExpenseActions';

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

  useEffect(() => {
    const months = getUniqueMonths(expenses);
    setAvailableMonths(months);
  }, [expenses]);

  const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };

  const getUniqueMonths = (expenses) => {
    const monthSet = new Set();
    expenses.forEach(exp => {
      if (exp.date) monthSet.add(getMonthYear(exp.date));
    });
    return Array.from(monthSet).sort((a, b) => new Date(b) - new Date(a)); // newest first
  };

  const filterExpenses = (expenses, selectedMonth) => {
    return selectedMonth
      ? expenses.filter(exp => getMonthYear(exp.date) === selectedMonth)
      : expenses;
  };

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

  // Get total of all expenses
  const getTotalAmount = (expenses) => {
    return expenses.reduce((total, expense) => total + (Number(expense.price) || 0), 0);
  };

  const filteredExpenses = filterExpenses(expenses, selectedMonth);
  const groupedExpenses = groupByCategory(filteredExpenses);
  const totalAmount = getTotalAmount(filteredExpenses);

  return (
    <div className={styles.filterAndSort}>
      <div className={styles.controls}>
        <label className={styles.filterLabel}>Filter by month:</label>
        <select className={styles.dropdownMenu} value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">All months</option>
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {Object.keys(groupedExpenses).length === 0 ? (
        <p>No expenses to show.</p>
      ) : (
        Object.entries(groupedExpenses).map(([category, items]) => (
          <div key={category} className={styles.categoryGroup}>
            <h2 className={styles.categoryName}>{category}</h2>
            {items.map(expense => (
              <div key={expense.id} className={styles.expenseItem}>
                <ul className={styles.liItems}>
                    <li><h4 className={styles.expenseH4}>{expense.name}</h4></li>
                    <li><p className={styles.expenseP}>Amount: ${Number(expense.price).toFixed(2)}</p></li>
                    <li><p className={styles.expenseP}>Date: {expense.date}</p></li>
                </ul>
                
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

      {/* Display the total */}
      <div className={styles.totalContainer}>
        <h3 className={styles.totalAmount}>Total Expenses: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default FilterAndSort;
