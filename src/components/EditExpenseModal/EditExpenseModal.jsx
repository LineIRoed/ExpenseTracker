import React, { useState, useEffect } from 'react';
import styles from './editExpenseModal.module.css';
import { categories } from '../Categories/Categories';
import Button from "../Buttons/Button";

// EditExpenseModal component for editing an existing expense
const EditExpenseModal = ({ isOpen, onClose, expense, onSave }) => {
  const [editedExpense, setEditedExpense] = useState({});
  const [errors, setErrors] = useState({}); // ✅ Add validation state

  // useEffect hook to update the editedExpense state whenever the passed `expense` prop changes
  useEffect(() => {
    if (expense) {
      setEditedExpense({ ...expense });
      setErrors({}); // clear previous errors when new expense is loaded
    }
  }, [expense]);

  // Handle input change for fields (name, price, category, date)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // clear error on change
  };

  // Handle saving the edited expense
  const handleSave = () => {
    const newErrors = {};
    if (!editedExpense.name) newErrors.name = "Name is required";
    if (!editedExpense.price) newErrors.price = "Price is required";
    if (!editedExpense.category) newErrors.category = "Category is required";
    if (!editedExpense.date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
          {errors.name && <div className={styles.tooltip}>{errors.name}</div>}

          {/* Price input field */}
          <label>Price</label>
          <input 
            type="number" 
            name="price" 
            value={editedExpense.price || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          />
          {errors.price && <div className={styles.tooltip}>{errors.price}</div>}

          {/* Category dropdown selection */}
          <label>Category</label>
          <select
            name="category" 
            value={editedExpense.category || ''} 
            onChange={handleChange} 
            className={styles.inputContainer}
          >
            <option value="" disabled hidden>Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && <div className={styles.tooltip}>{errors.category}</div>}

          {/* Date input field */}
          <label>Date</label>
          <input 
            type="date"
            name='date'
            value={editedExpense.date ? editedExpense.date.split("T")[0] : ""} 
            onChange={handleChange}
            className={styles.inputContainer}
          />
          {errors.date && <div className={styles.tooltip}>{errors.date}</div>}

          {/* Actions buttons */}
          <div className={styles.actionsBtn}>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
