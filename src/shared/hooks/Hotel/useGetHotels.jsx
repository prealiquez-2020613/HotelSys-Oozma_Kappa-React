import { useState } from 'react'
import toast from 'react-hot-toast'
import { getAllHotels } from '../../../services/api'

export const useGetHotels = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [hotels, setHotels] = useState([])

  async function getHotels() {
    setIsLoading(true)
    const response = await getAllHotels()

    if (response.error) {
      setError(true)

      if (response?.err?.response?.data?.errors) {
        let arrayErrors = response?.err?.response?.data?.errors
        for (const error of arrayErrors) {
          return toast.error(error.msg)
        }
      }

      setIsLoading(false)
      return 
    }

    // Aquí corriges la asignación
    setHotels(response.data.hotels)
    setIsLoading(false)
  }

  return {
    getHotels, isLoading, error, hotels, setHotels
  }
}
