import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import SubBlog from 'src/pages/subblog';
import CoponPage from 'src/pages/copon';
import DashboardLayout from 'src/layouts/dashboard';

import UserHome from 'src/sections/user/CRUD/UserHome';
import BlogHome from 'src/sections/blog/CRUD/BlogHome';
import CoponHome from 'src/sections/copon/CRUD/CoponHome';
import BrandHome from 'src/sections/brand/CRUD/BrandHome';
import UserUpdate from 'src/sections/user/CRUD/UserUpdate';
import UserCreate from 'src/sections/user/CRUD/UserCreate';
import BlogCreate from 'src/sections/blog/CRUD/BlogCreate';
import BlogUpdate from 'src/sections/blog/CRUD/BlogUpdate';
import CoponUpdate from 'src/sections/copon/CRUD/CoponUpdate';
import CoponCreate from 'src/sections/copon/CRUD/CoponCreate';
import BrandCreate from 'src/sections/brand/CRUD/BrandCreate';
import BrandUpdate from 'src/sections/brand/CRUD/BrandUpdate';
import ProductHome from 'src/sections/product/CRUD/ProductHome';
import SubblogHome from 'src/sections/sub-blog/CRUD/SubblogHome';
import ProductUpdate from 'src/sections/product/CRUD/ProductUpdate';
import ProductCreate from 'src/sections/product/CRUD/ProductCreate';
import SubblogUpdate from 'src/sections/sub-blog/CRUD/SubblogUpdate';
import SubblogCreate from 'src/sections/sub-blog/CRUD/SubblogCreate';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SubblogPage = lazy(() => import('src/pages/subblog'));
export const BrandPage = lazy(() => import('src/pages/brand'));

// export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [

        // nottice the change happened here mahmoud
        { element: <IndexPage />, index: true },
        { path: 'products/*', element: <ProductsPage /> },
        { path: 'brand/*', element: <BrandPage /> },
        { path: 'user/*', element: <UserPage /> },
        { path: 'blog/*', element: <BlogPage /> },
        { path: 'subblog/*', element: <SubBlog /> },
        { path: 'copon/*', element: <CoponPage /> },

        // Home here
        { path: 'UserHome', element: <UserHome />},
        { path: 'BlogHome', element: <BlogHome /> },
        { path: 'SubblogHome', element: <SubblogHome /> },
        { path: 'BrandHome', element: <BrandHome /> },
        { path: 'CoponHome', element: <CoponHome /> },
        { path: 'ProductHome', element: <ProductHome /> },


        // Update Paths Here:
        { path: '/UserUpdate/:id', element: <UserUpdate /> },
        { path: '/BlogUpdate/:id', element: <BlogUpdate /> },
        { path: '/BrandUpdate/:id', element: <BrandUpdate /> },
        { path: '/CoponUpdate/:id', element: <CoponUpdate /> },
        { path: '/ProductUpdate/:id', element: <ProductUpdate /> },
        { path: '/SubblogUpdate/:id', element: <SubblogUpdate /> },

        // Create Paths Here:
        { path: 'UserCreate', element: <UserCreate /> },
        { path: 'BlogCreate', element: <BlogCreate /> },
        { path: 'SubblogCreate', element: <SubblogCreate /> },
        { path: 'BrandCreate', element: <BrandCreate /> },
        { path: 'CoponCreate', element: <CoponCreate /> },
        { path: 'ProductCreate', element: <ProductCreate /> },

      ],
    },
    // { //removed login page
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
