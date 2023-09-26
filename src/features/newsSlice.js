import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "../service/newsService";

export const getNews = createAsyncThunk("auth/logout", async () => {
  return await newsService.getNews;
});
const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
      console.log(action.payload);
    });
  },
});
export default newsSlice.reducer;
