import * as React from 'react';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setModalClose } from './modalSlice';
import './Modal.css';

const Modal = () => {
  const modalContent = useSelector((state) => state.modal.modalContent);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const dispatch = useDispatch();
  
  if (!modalOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <article className="modal">
        <button type="button" onClick={() => dispatch(setModalClose())}>Close</button>
        {modalContent}
      </article>
    </div>,
    document.getElementById('portal'),
  );
};

export default Modal;
