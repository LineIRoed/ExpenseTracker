import React, { useState } from 'react';
import styles from './banner.module.css';
import Button from '../Buttons/Button.jsx';

const Banner = ({ onAddExpense }) => {
  const [expenseName, setExpenseName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      price: parseFloat(price),
      category,
      date,
    };

    console.log("New expense being added:", newExpense);
    onAddExpense(newExpense);

    setExpenseName('');
    setPrice('');
    setCategory('');
    setDate('');
  };

  return (
    <nav className={styles.banner}>
      <h1 className={styles.bannerTitle}>Expense Tracker</h1>
      <form onSubmit={handleSubmit} className={styles.expenseForm}>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Expense Name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          required
        />
        <input
          className={styles.formInput}
          type="number"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
        <select required value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled hidden>Select category</option>
          <option value="housing">Housing</option>
          <option value="utilities">Utilities</option>
          <option value="grocery">Grocery</option>
          <option value="transportation">Transportation</option>
          <option value="clothing">Clothing</option>
          <option value="entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          required
        />
        <Button type="submit">Add Expense</Button>
      </form>
    </nav>
  );
};

export default Banner;
