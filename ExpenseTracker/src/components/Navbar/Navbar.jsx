import React, { useState } from 'react';
import styles from './navBar.module.css';

const Banner = () => {
  const [expenseName, setExpenseName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

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
    };

    const existingExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = [...existingExpenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    setExpenseName('');
    setPrice('');
    setCategory('');
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
          type="text"
          placeholder="$0.00"
          value={price}
          onChange={handlePriceChange}
          onBlur={handleBlur}
          required
        />
        
        <select required value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="housing">Housing</option>
          <option value="utilities">Utilities</option>
          <option value="grocery">Grocery</option>
          <option value="transportation">Transportation</option>
          <option value="clothing">Clothing</option>
          <option value="entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        
        <button type="submit">Add Expense</button>
      </form>
    </nav>
  );
};

export default Banner;
