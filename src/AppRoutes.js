import { Menu } from "./components/Menu";
import { Cart } from "./components/Cart";
import { Home } from "./components/Home";
import { ItemPage } from "./components/ItemPage";


const AppRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: '/menu',
        element: <Menu />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/item',
        element: <ItemPage />
    },
];

export default AppRoutes;