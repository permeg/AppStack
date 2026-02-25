import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import AllApplications from './pages/AllApplications';
import ApplicationDetail from './pages/ApplicationDetail';
import CreateApplication from './pages/CreateApplication';
import TagExplorer from './pages/TagExplorer';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Dashboard /></Layout>,
  },
  {
    path: '/applications',
    element: <Layout><AllApplications /></Layout>,
  },
  {
    path: '/applications/new',
    element: <Layout><CreateApplication /></Layout>,
  },
  {
    path: '/applications/:id',
    element: <Layout><ApplicationDetail /></Layout>,
  },
  {
    path: '/applications/:id/edit',
    element: <Layout><CreateApplication /></Layout>,
  },
  {
    path: '/tags',
    element: <Layout><TagExplorer /></Layout>,
  },
  {
    path: '/settings',
    element: <Layout><Settings /></Layout>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);