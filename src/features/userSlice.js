import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateAxios } from "../service/axios";
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, thunkAPI) => {
    try {
      const res = await privateAxios.get("user/userdetails");
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isError: false,
    isSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isError = true;
      });
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer;
