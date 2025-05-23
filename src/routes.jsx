import { LoginPage } from "./pages/login/LoginPage"
import { RegisterPage } from "./pages/register/registerPage"
import { HotelPage } from "./pages/hotel/HotelPage"
import { HotelInfo } from "./components/hotel/HotelInfo"
import { GestorPage } from "./pages/hotel/GestorPage"
import { NotFoundPage } from "./pages/notfound/NotFoundPage"

export const routes = [
    {path:'/',element:<HotelPage/>},
    {path:'/register',element:<RegisterPage/>},
    {path:'/login',element:<LoginPage/>},
    {path:'/hotel/:hotelId', element:<HotelInfo/>},
    {path:'/hotels', element:<GestorPage/>},
    {path:'*', element:<NotFoundPage/>}
]