import React, { useEffect } from 'react';
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

const queryClient = new QueryClient();

import { AuthProvider, useAuth } from './context/auth-context.tsx';

import './index.scss';
import LoginPage from './pages/login/login-page.tsx';
import DashboardPage from './pages/dashboard/dashboard-page.tsx';
import OrderPage from './pages/order/order-page.tsx';
import ProfilePage from './pages/profile/profile-page.tsx';
import MastersPage from './pages/masters/masters-page.tsx';
import ClientsPage from './pages/clients/clients-page.tsx';
import ClientPage from './pages/clients/client-page.tsx';
import MasterPage from './pages/masters/master-page.tsx';
import socket from './libs/socket.ts';
import toast from 'react-hot-toast';


// eslint-disable-next-line react-refresh/only-export-components
const Root: React.FC = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Подписка на событие обновления данных
    socket.on('connect', () => {
      console.log('Socket подключен'); // Это сообщение должно появляться в консоли браузера
    });

    socket.on('dataUpdated', (newData) => {
      console.log('first');
      console.log('newData: ', newData);
      toast.success('Создан новый заказ');
    });

    // Очистка подписки при размонтировании компонента
    return () => {
      socket.off('dataUpdated');
      socket.off('connect');
    };
  }, []);

  return isAuthenticated ? (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  ) : (
    <LoginPage />
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/orders/:id',
        element: <OrderPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/masters',
        element: <MastersPage />,
      },
      {
        path: '/masters/:id',
        element: <MasterPage />,
      },
      {
        path: '/clients',
        element: <ClientsPage />,
      },
      {
        path: '/clients/:id',
        element: <ClientPage />,
      },
    ],
  },
]);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope: ', registration.scope);
    }).catch((error) => {
      console.log('Service Worker registration failed: ', error);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastProvider />
  </React.StrictMode>,
);
