import Home from '../pages/public/home';
import LoginPage from '../pages/auth/login';
import Pages from '../pages/private/pages';
import SinglePage from '../pages/private/single-page';
import Steps from '../pages/private/steps';
import Modules from '../pages/private/modules';
import SingleModule from '../pages/private/single-module';
import Sections from '../pages/private/sections';
import NoMatch from '../pages/public/noMatch';

const routes = [
  {
    path: '/',
    exact: true,
    auth: false,
    component: Home
  },
  {
    path: '/login',
    exact: true,
    auth: false,
    component: LoginPage
  },
  {
    path: '/admin/pages',
    exact: true,
    auth: true,
    component: Pages
  },
  {
    path: '/admin/pages/create',
    exact: true,
    auth: true,
    component: SinglePage
  },
  {
    path: '/admin/pages/edit/:pageId',
    exact: true,
    auth: true,
    component: SinglePage
  },
  {
    path: '/admin/steps',
    exact: true,
    auth: true,
    component: Steps
  },
  {
    path: '/admin/modules',
    exact: true,
    auth: true,
    component: Modules
  },
  {
    path: '/admin/modules/create',
    exact: true,
    auth: true,
    component: SingleModule
  },
  {
    path: '/admin/modules/edit/:moduleId',
    exact: true,
    auth: true,
    component: SingleModule
  },
  {
    path: '/admin/sections',
    exact: true,
    auth: true,
    component: Sections
  },
  {
    path: '',
    exact: true,
    auth: false,
    component: NoMatch
  }
];

export default routes;
