import { useState } from 'react'
import { registerRequest } from '../../services/api'
import toast from 'react-hot-toast'

export const useRegister = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const register = async (name, surname, username, email, password, phone) => {
    setIsLoading(true)

    const user = {name, surname, username, email, password, phone}

    const response = registerRequest(user)
    setIsLoading(false)

    if (response.error){
      setError(true)
      if (response?.err?.response?.data?.errors){
        let arrayErrors = response?.err?.response?.data?.errors
        for(const error of arrayErrors){
          return toast.error(error.msg)
        }
      }

      if (username === response?.err?.response?.data?.err.keyValue.username){
        return toast.error('Username already exist')
      }

      if (email === response?.err?.response?.data?.err.keyValue.email){
        return toast.error('Email already exist')
      }

      return toast.error(
        response?.err?.response?.data?.msg || response?.err?.data?.msg || 'General error creating user'
      )
    }
    setError(false)
    return toast.success('User created succesfully')

  }

  return {
    register, isLoading, error, setError
  }
}


