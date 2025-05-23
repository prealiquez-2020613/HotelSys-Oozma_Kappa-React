import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { loginRequest } from "../../services/api.js"

export const useLogin = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const login = async (username, password) => {
    setIsLoading(true)

    const user = { username, password }

    const response = await loginRequest(user)
    setIsLoading(false)

    if (response.error) {
      return toast.error(response.message)
    }

    const { loggedUser, message, token } = response.data
    console.log(response.data);
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(loggedUser))


    if (token) {
      navigate('/hotels')
      return toast.success(message)
    }
    localStorage.setItem('token', response.data.token)
  }

  return {
    login, isLoading
  }
}
