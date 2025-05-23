import { useState } from "react"
import toast from 'react-hot-toast'
import { loginRequest } from "../../services/api.js"

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const login = async (username, password) => {
        setIsLoading(true)

        const user = {username, password}

        const response = await loginRequest(user)
        setIsLoading(false)

        if (response.error){
          setError(true)

          if(response?.err?.response?.data?.errors){
            let arrayErrors = response?.err?.response?.data?.errors
            for (const error of arrayErrors) {
              return toast.error(error.msg)
            }
          }

          return toast.error(
              response?.err?.response?.data || response?.err?.data?.msg || 'General error trying to log in'
          )
        }

        toast.success('Login succesfully')
        localStorage.setItem('token', response.data.token)

    }

  return {
    login, isLoading
  }
}
