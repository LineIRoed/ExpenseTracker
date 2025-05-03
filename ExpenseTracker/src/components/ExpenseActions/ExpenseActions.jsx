import React from 'react';
import styles from './expenseActions.module.css';

const ExpenseActions = ({ expense, onEdit, onDelete }) => {
  return (
    <div className={styles.editDeleteBtn}>
      <button onClick={() => onEdit(expense)}>Edit</button>
      <button onClick={() => onDelete(expense.id)}>Delete</button>
    </div>
  );
};

export default ExpenseActions;
