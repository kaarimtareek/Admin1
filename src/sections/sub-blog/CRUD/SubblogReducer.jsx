import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
// eslint-disable-next-line arrow-body-style
export const getsubBlogs = createAsyncThunk('subblogs/getsubBlogs', () => {
  return axios
    .get(`${baseUrl}/category/65d491ae7d597cdac7f67bf6/subcategory`)
    .then((res) => res.data.subCategories);
});

export const updateSubblog = createAsyncThunk('brands/updateSubblog', ({ id, name, img }) => {
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
    url: `${baseUrl}/category/65d491ae7d597cdac7f67bf6/subcategory/${id}`,
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

export const addSubBlog = createAsyncThunk('brands/addSubblog', async ({ name, img }) => {
  // eslint-disable-next-line no-debugger
  debugger;

  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', img);

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  };

  const config = {
    method: 'post',
    url: `${baseUrl}/category/65d491ae7d597cdac7f67bf6/subcategory`,
    headers,
    data: formData,
  };

  console.log(config);

  // Send the request using Axios
  const response = await axios(config);
  console.log(response);
});

const initialState = {
  subBlogs: [],
  loading: false,
  status: 'idle',
  updated: false,
  error: null,
};

const subblogSlice = createSlice({
  name: 'subblogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateSubblog.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(addSubBlog.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(getsubBlogs.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getsubBlogs.fulfilled, (state, action) => {
      // eslint-disable-next-line no-debugger
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.subBlogs = action.payload;
    });
    builder.addCase(getsubBlogs.rejected, (state, action) => {
      state.loading = false;
      state.subBlogs = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const { deleteSubblog } = subblogSlice.actions;
export const selectAllSubBlogs = (state) => state.subBlogs;

export default subblogSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// import { blogList } from "./Data";

// const blogSlice = createSlice({
//     name: "blogs",
//     initialState: blogList,
//     reducers: {
//         addBlog: (state, action) => {
//             state.push(action.payload);
//         },
//         updateBlog: (state, action) => {
//             const { id, name, img } = action.payload;
//             const blogToUpdate = state.find(blog => blog.id === id);
//             if (blogToUpdate) {
//                 blogToUpdate.name = name;
//                 blogToUpdate.img = img;
//             }
//         },
//         deleteBlog: (state, action) => {
//             const { id } = action.payload;
//             // Modify the state directly
//             const index = state.findIndex(blog => blog.id === id);
//             if (index !== -1) {
//                 state.splice(index, 1);
//             }
//         }
//     }
// });

// export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
// export default blogSlice.reducer;
