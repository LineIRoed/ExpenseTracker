import React, { useState, useEffect } from 'react';
import Banner from './components/Navbar/Banner.jsx';
import FilterAndSort from './components/FilterAndSort/FilterAndSort.jsx';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    console.log("Loaded expenses:", storedExpenses);  // Debugging log
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      console.log("Saving expenses:", expenses);  // Debugging log
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    console.log("Adding new expense:", newExpense);  // Debugging log
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  return (
    <div className="App">
      <Banner onAddExpense={handleAddExpense}/>
      <FilterAndSort expenses={expenses}/>
    </div>
  );
};

export default App;
