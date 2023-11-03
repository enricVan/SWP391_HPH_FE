import { createSlice } from "@reduxjs/toolkit";
const defaultUser = {
  roleId: "",
  username: "",
  password: "",
  email: "",
  fullName: "",
  address: "",
  gender: "",
  phone: "",
  avatar: null,
};
const userFormSlice = createSlice({
  name: "userForm",
  initialState: {
    currentStep: 1,
    user: defaultUser,
  },
  reducers: {
    next: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    back: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    chooseRole: (state, action) => {
      state.user = defaultUser;
      state.user = { ...state.user, roleId: action.payload };
    },
    updateFields: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setAvatar: (state, action) => {
      state.user = { ...state.user, avatar: action.payload };
    },
  },
});
export const { next, back, chooseRole, updateFields, setAvatar } =
  userFormSlice.actions;
export default userFormSlice.reducer;
