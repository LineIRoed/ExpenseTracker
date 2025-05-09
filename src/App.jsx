import React, { useState, useEffect } from 'react';
import Banner from './components/Navbar/Banner.jsx';
import FilterAndSort from './components/FilterAndSort/FilterAndSort.jsx';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import EditExpenseModal from './components/EditExpenseModal/EditExpenseModal';
import "./app.css"

const App = () => {
  // State variables to manage expenses, modals, and the selected expense to edit/delete
  const [expenses, setExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Load stored expenses from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  // Update localStorage whenever the expenses state changes
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  // Handle adding a new expense
  const handleAddExpense = (newExpense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const handleSaveEditedExpense = (updatedExpense) => {
    // Update the existing expense with the new data
    setExpenses((prev) =>
      prev.map((exp) => 
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );
    setIsEditModalOpen(false);
  };

  // Handle the request to delete an expense
  const handleDeleteExpense = (id) => {
    setExpenseToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm the deletion of an expense
  const handleConfirmDelete = () => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const updatedExpenses = storedExpenses.filter(expense => expense.id !== expenseToDelete);

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    setExpenses(updatedExpenses);

    // Close the delete modal and reset the expense ID to delete
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };
  
  // Close the delete confirmation modal without deleting the expense
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  // Open the edit modal with the selected expense to edit
  const handleOpenEditModal = (expense) => {
    setExpenseToEdit(expense);
    setIsEditModalOpen(true);
  };

  return (
    <div className="App">
      {/* Banner component to add new expenses */}
      <Banner onAddExpense={handleAddExpense} />
      {/* Filter and Sort component to display and filter the list of expenses */}
      <FilterAndSort 
        expenses={expenses} 
        onDelete={handleDeleteExpense}
        onEdit={handleOpenEditModal}
      />

      {/* Edit Expense Modal */}
      <EditExpenseModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        expense={expenseToEdit} 
        onSave={handleSaveEditedExpense} 
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={handleCloseDeleteModal} 
        onConfirm={handleConfirmDelete} 
        message="Are you sure you want to delete this expense?" 
      />
    </div>
  );
};

export default App;
