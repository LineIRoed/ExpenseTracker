import React, { useState, useEffect } from 'react';
import styles from './editExpenseModal.module.css';
import { categories } from '../Categories/Categories';
import Button from "../Buttons/Button"

// EditExpenseModal component for editing an existing expense
const EditExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
  const [editedExpense, setEditedExpense] = useState({});

  // useEffect hook to update the editedExpense state whenever the passed `expense` prop changes
  useEffect(() => {
    if (expense) {
      setEditedExpense({ ...expense });
    }
  }, [expense]);

  // Handle input change for fields (name, price, category, date)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving the edited expense
  const handleSave = () => {
    const { name, price, category, date } = editedExpense;
  
    if (!name || !price || !category || !date) {
      alert("Please fill out all fields before saving.");
      return;
    }
  
    onSave(editedExpense);
  };

  // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalHeader}>Edit Expense</h3>
        <div className={styles.formContainer}>
          {/* Name input field */}
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={editedExpense.name || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          />
          {/* Price input field */}
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            value={editedExpense.price || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          />
          {/* Category dropdown selection */}
          <label>Category</label>
          <select
            type="text" 
            name="category" 
            value={editedExpense.category || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
            required
          >
            <option value="" disabled hidden>Select category</option>
              {/* Map through categories to display them as options in the dropdown */}
              {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {/* Date input field */}
          <label>Date</label>
          <input 
            type="date"
            name='date'
            value={editedExpense.date ? editedExpense.date.split("T")[0] : ""} 
            onChange={handleChange}
            className={styles.inputContainer}
          />
          {/* Actions buttons */}
          <div className={styles.actionsBtn}>
            {/* Save button triggers the handleSave function */}
            <Button onClick={handleSave}>Save</Button>
            {/* Cancel button triggers the onClose function to close the modal */}
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
