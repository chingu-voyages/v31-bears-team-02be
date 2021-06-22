import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalOpen: false,
    modalContent: <></>,
  },
  reducers: {
    setModalOpen: (state) => { state.modalOpen = true },
    setModalClose: (state) => { state.modalOpen = false },
    setModalContent: (state, action) => { state.modalContent = action.payload }
  }
})

export const { setModalOpen, setModalClose, setModalContent } = modalSlice.actions;

export default modalSlice.reducer;
