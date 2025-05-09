import React, { useState, useEffect } from 'react';
import Banner from './components/Navbar/Banner.jsx';
import FilterAndSort from './components/FilterAndSort/FilterAndSort.jsx';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import EditExpenseModal from './components/EditExpenseModal/EditExpenseModal';
import './app.css'

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const handleSaveEditedExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) => 
        exp.id === updatedExpense.id ? updatedExpense : exp
      )
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenseToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== expenseToDelete));
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const handleOpenEditModal = (expense) => {
    setExpenseToEdit(expense);
    setIsEditModalOpen(true);
  };

  return (
    <div className="App">
      <Banner onAddExpense={handleAddExpense} />
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
