import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;

// eslint-disable-next-line arrow-body-style
export const getCoupons = createAsyncThunk('coupons/getCoupons', () => {
  return axios.get(`${baseUrl}/coupon`).then((res) => res.data.coupon);
});

export const updateCoupon = createAsyncThunk('coupons/updateCoupon', ({ id, name, amount }) => {
  // eslint-disable-next-line no-debugger

  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('amount', amount);

  const headers = {
    'Content-Type': 'multipart/form-data', // Set the Content-Type header
    Authorization: token, // Set the Authorization header
  };

  // Define request configuration object
  const config = {
    method: 'put',
    url: `${baseUrl}/coupon/${id}`,
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

export const addCoupon = createAsyncThunk('coupons/addCoupon', ({ name, amount, expireDate }) => {
  // eslint-disable-next-line no-debugger
  debugger;
  const token = import.meta.env.VITE_BASE_JWT_TOKEN;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('amount', amount);
  formData.append('expireIn', expireDate);

  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: token,
  };

  const config = {
    method: 'post',
    url: `${baseUrl}/coupon`,
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
      console.error('Error:', error);
    });
});

const initialState = {
  coupons: [],
  loading: false,
  status: 'idle',
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    addCoupon: (state, action) => {
      // eslint-disable-next-line no-debugger
      debugger;

      const { name, amount, expireDate } = action.payload;
      const token = import.meta.env.VITE_BASE_JWT_TOKEN;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('amount', amount);
      formData.append('expireIn', expireDate);

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      };

      const config = {
        method: 'post',
        url: `${baseUrl}/coupon`,
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
          console.error('Error:', error);
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {});

    builder.addCase(getCoupons.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.coupons = action.payload;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const { deleteCoupon } = couponSlice.actions;
export const selectAllCoupons = (state) => state.coupons;
export default couponSlice.reducer;
