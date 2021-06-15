import * as React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ children, modalOpen, setModalOpen }) => {
  if (!modalOpen) return null;
  return createPortal(
    <div className="modal-overlay">
      <article className="modal">
        <button type="button" onClick={(() => setModalOpen(false))}>Close</button>
        {children}
      </article>
    </div>,
    document.getElementById('portal'),
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.element, PropTypes.func]).isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default Modal;
