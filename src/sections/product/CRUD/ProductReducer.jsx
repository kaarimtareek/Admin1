import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

// eslint-disable-next-line arrow-body-style
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  return axios
    .get(`${baseUrl}/product`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data.products);
});

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const headers = {
      Authorization: token,
    };

    const config = {
      method: 'delete',
      url: `${baseUrl}/product/${id}`,
      headers,
    };

    console.log(config);

    // Send the request using Axios
    try {
      const response = await axios(config);
      if (response.status === 200 || response.status === 201 || response.status === 202) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'brands/updateProduct',
  async (
    { id, name, mainImage, subImages, price, stock, discount, sizes, colors },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append('name', name);
    if (mainImage !== null) {
      formData.append('mainImage', mainImage);
    }
    if (subImages.length > 0) {
      subImages.forEach((subImage) => {
        formData.append('subImage', subImage);
      });
    }

    formData.append('price', parseInt(price, 10));
    formData.append('stock', parseInt(stock, 10));
    if (parseInt(discount, 10) > 0) {
      formData.append('discount', parseInt(discount, 10));
    }

    if (colors.length > 0) {
      formData.append('colors', colors.join(','));
    }
    if (sizes.length > 0) {
      formData.append('size', sizes.join(','));
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    };

    const config = {
      method: 'put',
      url: `${baseUrl}/product/${id}`,
      headers,
      data: formData,
    };

    console.log(config.data);

    // Send the request using Axios
    try {
      const response = await axios(config);
      if (response.status === 200 || response.status === 201 || response.status === 202) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'brands/addProduct',
  async (
    {
      name,
      mainImage,
      subImages,
      price,
      stock,
      categoryId,
      brandId,
      description,
      subCategoryId,
      discount,
      sizes,
      colors,
    },
    { rejectWithValue }
  ) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (mainImage !== null) {
      formData.append('mainImage', mainImage);
    }
    if (subImages.length > 0) {
      subImages.forEach((subImage) => {
        formData.append('subImage', subImage);
      });
    }

    formData.append('categoryId', categoryId.value);
    formData.append('subCategoryId', subCategoryId.value);
    formData.append('brandId', brandId.value);

    formData.append('price', parseInt(price, 10));
    formData.append('stock', parseInt(stock, 10));
    if (parseInt(discount, 10) > 0) {
      formData.append('discount', parseInt(discount, 10));
    }

    if (colors.length > 0) {
      formData.append('colors', colors.join(','));
    }
    if (sizes.length > 0) {
      formData.append('size', sizes.join(','));
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    };

    const config = {
      method: 'post',
      url: `${baseUrl}/product`,
      headers,
      data: formData,
    };

    console.log(config.data);

    // Send the request using Axios
    try {
      const response = await axios(config);
      if (response.status === 200 || response.status === 201 || response.status === 202) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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

export const selectAllProducts = (state) => state.products;
export default productSlice.reducer;
