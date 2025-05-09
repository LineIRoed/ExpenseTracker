import React from 'react';
import styles from './confirmationModal.module.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalHeader}>{message}</h3>
        <div className={styles.actionsBtn}>
          <button onClick={onConfirm} className={styles.confirmButton}>Yes</button>
          <button onClick={onClose} className={styles.cancelButton}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
