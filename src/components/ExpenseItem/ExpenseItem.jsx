import React from "react";

const ExpenseItem = ({ expense }) => {
  return (
    <div className={styles.expenseItem || "expenseItem"}>
      <h3>{expense.name}</h3>
      <p>Amount: ${expense.price.toFixed(2)}</p>
      <p>Category: {expense.category}</p>
      <p>Date: {expense.date}</p>
    </div>
  );
};

export default ExpenseItem;
