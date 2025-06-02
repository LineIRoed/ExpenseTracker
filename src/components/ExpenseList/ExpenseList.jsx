import React from "react";
import styles from './expenseList.module.css';
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses }) => {
  return (
    <div className={styles.expenseList}>
      {expenses.length === 0 ? (
        <p>No expenses logged yet.</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;

