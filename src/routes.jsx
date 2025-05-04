import { LoginPage } from "./pages/login/LoginPage"
import { RegisterPage } from "./pages/register/registerPage"

export const routes = [
    {path:'/',element:<LoginPage/>},
    {path:'/register',element:<RegisterPage/>}
]