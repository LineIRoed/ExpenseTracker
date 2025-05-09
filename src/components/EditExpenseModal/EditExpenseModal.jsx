import React, { useState, useEffect } from 'react';
import styles from './editExpenseModal.module.css';

const EditExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    if (expense) {
      setEditedExpense({ ...expense });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedExpense);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalHeader}>Edit Expense</h3>
        <div className={styles.formContainer}>
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={editedExpense.name || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          />
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            value={editedExpense.price || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          />
          <label>Category</label>
          <input 
            type="text" 
            name="category" 
            value={editedExpense.category || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          />
          <label>Date</label>
          <input 
            type="date"
            name='date'
            value={editedExpense.date ? editedExpense.date.split("T")[0] : ""} 
            onChange={handleChange}
            className={styles.inputContainer}
          />
          <div className={styles.actionsBtn}>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
