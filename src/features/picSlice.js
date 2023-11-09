import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { privateAxios } from '../service/axios';
export const getUserPic = createAsyncThunk('user/user-pic', async (userId) => {
  const res = await privateAxios(`user/user-pic/${userId}`, {
    responseType: 'blob',
  });
  const url = URL.createObjectURL(res.data);
  return url;
});
const picSlice = createSlice({
  name: 'pic',
  initialState: {
    picUrl: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserPic.fulfilled, (state, action) => {
      state.picUrl = action.payload;
    });
  },
});
export default picSlice.reducer;
