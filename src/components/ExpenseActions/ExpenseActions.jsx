import React from 'react';
import styles from './expenseActions.module.css';
import Button from '../Buttons/Button';

// ExpenseActions component to handle Edit and Delete actions for each expense
const ExpenseActions = ({ expense, onEdit, onDelete }) => {
  return (
    <div className={styles.editDeleteBtn}>
      {/* Edit button triggers the onEdit function passed as a prop with the expense object */}
      <Button onClick={() => onEdit(expense)}>Edit</Button>
      {/* Delete button triggers the onDelete function passed as a prop with the expense id */}
      <Button onClick={() => onDelete(expense.id)}>Delete</Button>
    </div>
  );
};

export default ExpenseActions;
