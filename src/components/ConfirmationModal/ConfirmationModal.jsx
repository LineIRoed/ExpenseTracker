import React from 'react';
import styles from './confirmationModal.module.css';
import Button from '../Buttons/Button';

// ConfirmationModal component for displaying modal
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalHeader}>{message}</h3>
        <div className={styles.actionsBtn}>
          {/* Button to confirm the action */}
          <Button onClick={onConfirm} className={styles.confirmButton}>Yes</Button>
          {/* Button to cancel and close the modal */}
          <Button onClick={onClose} className={styles.cancelButton}>No</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
