import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import LayoutComponent from './components/layout/layout.tsx';
import ToastProvider from './providers/toast.tsx';

import Dashboard from './pages/dashboard/dashboard.tsx';
import Profile from './pages/profile/profile.tsx';

const queryClient = new QueryClient();

import './index.scss';
import { AuthProvider, useAuth } from './context/auth-context.tsx';
import Login from './pages/login/login.tsx';
import Masters from './pages/masters/masters.tsx';
import { ModalProvider } from './context/modal-context.tsx';
import Order from './pages/order/order.tsx';

// eslint-disable-next-line react-refresh/only-export-components
const Root: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  ) : (
    <Login />
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders/:id',
        element: <Order />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/masters',
        element: <Masters />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastProvider />
  </React.StrictMode>,
);
