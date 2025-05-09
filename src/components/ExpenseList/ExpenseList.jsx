import React from "react";
import styles from "./expenseList.module.css";

const ExpenseList = ({ expenses }) => {
    return (
        <div className={styles.expenseList}>
        {expenses.length === 0 ? (
          <p>No expenses logged yet.</p>
        ) : (
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
