import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { IntlProvider } from 'react-intl';

import { flatten } from 'flat';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { messages } from './locales/messages/index';
import { LOCALES } from './locales/constants';

import './index.css';
import Root from './routes/Root/Root';
import Trees from './routes/Trees/Trees';
import TreeDetails from './routes/TreeDetails/TreeDetails';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // eslint-disable-next-line no-magic-numbers
      gcTime: 1000 * 60 * 30, // 30 minutes,
      // eslint-disable-next-line no-magic-numbers
      staleTime: 1000 * 60 * 30, // 30 minutes,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Trees />,
      },
      {
        path: '/tree/:treeId',
        element: <TreeDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <IntlProvider messages={flatten(messages[LOCALES.EN_US])} locale="en">
        <RouterProvider router={router} />
      </IntlProvider>
    </PersistQueryClientProvider>
  </React.StrictMode>,
);
