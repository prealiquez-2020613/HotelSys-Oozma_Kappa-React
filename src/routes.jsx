import { LoginPage } from "./pages/login/LoginPage"
import { RegisterPage } from "./pages/register/registerPage"
import { HotelPage } from "./pages/hotel/HotelPage"

export const routes = [
    {path:'/',element:<HotelPage/>},
    {path:'/register',element:<RegisterPage/>},
    {path:'/login',element:<LoginPage/>}
]