import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const createAsyncThunk = from require("@reduxjs/toolkit").createAsyncThunk ;

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const getBrands = createAsyncThunk('brands/getBrands', () =>
  axios.get(`${baseUrl}/brand`).then((res) => res.data.brand)
);

export const updateBrand = createAsyncThunk('brands/updateBrand', ({ id, name, img }) => {
  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  const formData = new FormData();
  formData.append('name', name);
  // formData.append('image', img);

  const headers = {
    'Content-Type': 'multipart/form-data', // Set the Content-Type header
    Authorization: token, // Set the Authorization header
  };

  const config = {
    method: 'put',
    url: `${baseUrl}/brand/${id}`,
    headers,
    data: formData,
  };

  console.log(config);

  axios(config)
    .then((response) => {
      console.log('Response:', response);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

const initialState = {
  brands: [],
  loading: false,
  status: 'idle',
  error: null,
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line no-debugger
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.status = 'idle';
    });

    builder.addCase(getBrands.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.brands = action.payload;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});
export const { addBrand, deleteBrand } = brandSlice.actions;
export const selectAllBrands = (state) => state.brands;

export default brandSlice.reducer;

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
