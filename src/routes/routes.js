import Home from '../pages/public/home'
import LoginPage from '../pages/auth/login'
import Pages from '../pages/private/pages'
import NoMatch from '../pages/public/noMatch'

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
    path: '',
    exact: true,
    auth: false,
    component: NoMatch
  }
];

export default routes;
