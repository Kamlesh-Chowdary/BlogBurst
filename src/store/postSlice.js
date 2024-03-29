import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  posts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    updatePost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? (post = action.payload) : post
      );
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, addPost, updatePost, deletePost, setLoading } =
  postSlice.actions;
export default postSlice.reducer;
