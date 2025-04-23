import React, { useState } from 'react';
import styles from './navBar.module.css';
import Button from '../Buttons/Button.jsx'

const Banner = () => {
  const [expenseName, setExpenseName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const formatCurrency = (value) => {
    const amount = parseFloat(value);
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expenseName || !price || !category) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      price: parseFloat(price),
      category,
      date,
    };

    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = [...existingExpenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    setExpenseName('');
    setPrice('');
    setCategory('');
    setDate('');
  };

  const handlePriceChange = (e) => {
    const raw = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(raw)) {
      setPrice(raw);
    }
  };

  const handleBlur = () => {
    setPrice((prev) => {
      const formatted = formatCurrency(prev); 
      return formatted.replace(/[^0-9.]/g, ''); 
    });
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
          type="text"
          placeholder="$0.00"
          value={price}
          onChange={handlePriceChange}
          onBlur={handleBlur}
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
          onChange={(e) => setDate(e.target.value)}
          required
        />
        
        <Button type="submit">Add Expense</Button>
      </form>
    </nav>
  );
};

export default Banner;
