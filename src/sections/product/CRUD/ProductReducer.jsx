import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

// eslint-disable-next-line arrow-body-style
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  return axios
    .get(`${baseUrl}/product`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data.products);
});

export const updateProduct = createAsyncThunk('brands/updateProduct', async ({ id, name, img }) => {
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
  const response = await axios(config);
  console.log(response);
});

export const addProduct = createAsyncThunk('brands/addProduct', async ({ name, img }) => {
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
    method: 'post',
    url: `${baseUrl}/category`,
    headers,
    data: formData,
  };

  console.log(config);

  // Send the request using Axios
  const response = await axios(config);
  console.log(response);
});

const initialState = {
  products: [],
  loading: false,
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const { deleteProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.products;
export default productSlice.reducer;
