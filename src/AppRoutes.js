import { Admin } from "./components/Admin"
import Admin2 from "./components/Admin2"
import { Cart } from "./components/Cart"
import { Home } from "./components/Home"
import { Menu } from "./components/Menu"
import { NewUser } from "./components/NewUser"
import Order from "./components/Order"
import { UserDetails } from "./components/UserDetails"

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
  {
    path: "/admin2",
    element: <Admin2 />,
  },
  {
    path: "/userDetails",
    element: <UserDetails />,
  },
  {
    path: "/newUser",
    element: <NewUser />,
  },
  {
    path: "/order",
    element: <Order />,
  },
]

export default AppRoutes
