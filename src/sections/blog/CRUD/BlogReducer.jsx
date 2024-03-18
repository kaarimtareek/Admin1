import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

// eslint-disable-next-line arrow-body-style
export const getBlogs = createAsyncThunk('blogs/getBlogs', () => {
  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  return axios
    .get(`${baseUrl}/category`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data.categories);
});

export const updateBlog = createAsyncThunk('brands/updateBlog', ({ id, name, img }) => {
  // eslint-disable-next-line no-debugger
  debugger;

  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  const formData = new FormData();
  formData.append('name', name);
  if (img !== null) {
    formData.append('file', img);
  }

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  };

  const config = {
    method: 'put',
    url: `${baseUrl}/category/${id}`,
    headers,
    data: formData,
  };

  console.log(config);

  // Send the request using Axios
  axios(config)
    .then((response) => {
      console.log('Response:', response);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
});

const initialState = {
  blogs: [],
  loading: false,
  status: 'idle',
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBlog.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(getBlogs.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.blogs = action.payload;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const { addBlog, deleteBlog } = blogSlice.actions;
export const selectAllBlogs = (state) => state.blogs;
export default blogSlice.reducer;
