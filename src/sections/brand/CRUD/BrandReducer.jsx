import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const createAsyncThunk = from require("@reduxjs/toolkit").createAsyncThunk ;

const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const getBrands = createAsyncThunk('brands/getBrands', () =>
  axios.get(`${baseUrl}/brand`).then((res) => res.data.brand)
);

export const updateBrand = createAsyncThunk('brands/updateBrand', ({ id, name, img }) => {
  // eslint-disable-next-line no-debugger
  debugger;

  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('file', img);

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

export const addBrand = createAsyncThunk('brands/addBrand', async ({ name, img }) => {
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
    url: `${baseUrl}/brand`,
    headers,
    data: formData,
  };

  console.log(config);

  // Send the request using Axios
  const response = await axios(config);
  console.log(response);
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
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(addBrand.fulfilled, (state, action) => {
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
export const { deleteBrand } = brandSlice.actions;
export const selectAllBrands = (state) => state.brands;

export default brandSlice.reducer;
