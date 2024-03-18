import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import UserReducer from './sections/user/CRUD/UserReducer';
import BlogReducer from './sections/blog/CRUD/BlogReducer';
import BrandReducer from './sections/brand/CRUD/BrandReducer';
import CoponReducer from './sections/copon/CRUD/CoponReducer';
import SubblogReducer from './sections/sub-blog/CRUD/SubblogReducer';

const store = configureStore({
  reducer: {
    users: UserReducer,
    brands: BrandReducer,
    blogs: BlogReducer,
    subBlogs: SubblogReducer,
    coupons: CoponReducer,
  },
});

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
