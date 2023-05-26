import { Admin } from './components/Admin/Admin';
import { Cart } from './components/Cart/Cart';
import { Home } from './components/Home/Home';
import { Menu } from './components/Menu/Menu';

const AppRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
];

export default AppRoutes;
