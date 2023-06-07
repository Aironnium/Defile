import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"

import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, DEVICE_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component: Admin
    },
    {
        path:BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path:SHOP_ROUTE,
        Component: Shop
    },
    {
        path:LOGIN_ROUTE,
        Component: Login
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Register
    },
    {
        path:DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]