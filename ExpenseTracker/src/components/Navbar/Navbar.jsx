import React, { useState } from 'react';
import styles from "./navbar.module.css";

const Banner = () => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !amount || !category) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(amount),
      category,
    };

    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = [...existingExpenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    setExpenseName('');
    setAmount('');
    setCategory('');
  };

  return (
    <nav className="banner">
      <h1 className='bannerTitle'>Expense Tracker</h1>
      <form onSubmit={handleSubmit} className="expenseForm">
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="$ Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0"
          required
        />
        <select required value={category} onChange={(e) => setCategory(e.target.value)}>
          <option className='selectOption' value="">Select Category</option>
          <option className='selectOption' value="housing">Housing</option>
          <option className='selectOption' value="utilities">Utilities</option>
          <option className='selectOption' value="grocery">Grocery</option>
          <option className='selectOption' value="transportation">Transportation</option>
          <option className='selectOption' value="clothing">Clothing</option>
          <option className='selectOption' value="entertainment">Entertainment</option>
          <option className='selectOption' value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </nav>
  );
};

export default Banner;
