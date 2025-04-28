import React, { useState, useEffect } from 'react';
import styles from './filterAndSort.module.css';

const FilterAndSort = ({ expenses }) => {
  const [sortedExpenses, setSortedExpenses] = useState({});
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    groupAndSortExpenses(expenses, sortOrder);
  }, [expenses, sortOrder]);

  const groupAndSortExpenses = (expenses, sortOrder) => {
    const grouped = {};

    expenses.forEach(expense => {
      if (!grouped[expense.category]) {
        grouped[expense.category] = [];
      }
      grouped[expense.category].push(expense);
    });

    for (const category in grouped) {
      grouped[category].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    setSortedExpenses(grouped);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className={styles.filterAndSort}>
      <div className={styles.controls}>
        <label>Sort by date: </label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      {Object.keys(sortedExpenses).length === 0 ? (
        <p>No expenses to show.</p>
      ) : (
        Object.entries(sortedExpenses).map(([category, expenses]) => (
          <div key={category} className={styles.categoryGroup}>
            <h2>{category}</h2>
            {expenses.map(expense => (
              <div key={expense.id} className={styles.expenseItem}>
                <h3>{expense.name}</h3>
                <p>Amount: ${expense.price.toFixed(2)}</p>
                <p>Date: {expense.date}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default FilterAndSort;
