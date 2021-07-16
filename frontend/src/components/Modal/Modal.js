import * as React from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setModalClose } from "./modalSlice";
import "./Modal.css";

import SignUpForm from "../SignUpForm";
import SignInForm from "../SignInForm";

function resolveComponent(componentId) {
  switch (componentId) {
    case "SIGNUPFORM":
      return <SignUpForm />;
    case "SIGNINFORM":
      return <SignInForm />;
    default:
      return <></>;
  }
}

const Modal = () => {
  const modalContent = useSelector((state) => state.modal.modalContent);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const dispatch = useDispatch();

  if (!modalOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <article className="modal">
        <div className="w-full flex flex-row">
          <button
            className="ml-auto"
            type="button"
            onClick={() => dispatch(setModalClose())}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 12C24 20 20 24 12 24C4 24 0 20 0 12C0 4 4 0 12 0C20 0 24 4 24 12Z"
                fill="black"
                fillOpacity="0.32"
              />
              <path
                d="M8 8L16 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8L8 16"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {resolveComponent(modalContent)}
      </article>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
