import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userFormReducer from "./features/userFormSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    userForm: userFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
