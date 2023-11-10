import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '../service/axios';
export const getUserPic = createAsyncThunk(
  'user/user-pic',
  async (userId, thunkAPI) => {
    try {
      const res = await privateAxios(`user/user-pic/${userId}`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      return url;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const picSlice = createSlice({
  name: 'pic',
  initialState: {
    picUrl: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserPic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.picUrl = action.payload;
      })
      .addCase(getUserPic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.picUrl = null;
      });
  },
});
export default picSlice.reducer;
