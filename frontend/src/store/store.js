import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../components/App/authSlice';
import modalReducer from '../components/Modal/modalSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    authorization: authReducer,
  }
})