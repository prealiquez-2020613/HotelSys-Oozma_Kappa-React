import { useState } from 'react'
import { deleteHotel } from '../../../services/api'

export const useDeleteHotel = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const deleteHotelHook = async (id) => {
    setIsLoading(true)
    const response = await deleteHotel(id)
    setIsLoading(false)
    if (response.error) {
      setError(response.message || 'Error deleting hotel');
    }
    return response;
  }

  return {
    deleteHotelHook, isLoading, error
  }
}
