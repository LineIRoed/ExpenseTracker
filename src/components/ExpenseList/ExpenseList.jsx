import React from "react";
import styles from "./expenseList.module.css";

// ExpenseList component that displays the list of expenses
const ExpenseList = ({ expenses }) => {
    return (
        <div className={styles.expenseList}>
        {/* If there are no expenses, display this message */}
        {expenses.length === 0 ? (
          <p className={styles.noExpensesAlert}>No expenses logged yet.</p>
        ) : (
          // Map through the expenses array and display each expense
          expenses.map((expense) => (
            <div key={expense.id} className="expenseItem">
              <h3>{expense.name}</h3>
              <p>Amount: ${expense.price.toFixed(2)}</p>
              <p>Category: {expense.category}</p>
              <p>Date: {expense.date}</p>
            </div>
          ))
        )}
      </div>
    );
};

export default ExpenseList;
