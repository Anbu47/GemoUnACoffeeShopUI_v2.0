import { Admin } from "./components/Admin"
import { Cart } from "./components/Cart"
import { Home } from "./components/Home"
import { Menu } from "./components/Menu"

const AppRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]

export default AppRoutes
