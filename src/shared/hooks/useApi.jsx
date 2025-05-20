import { useState } from 'react'
import { getHotelsRequest } from '../../services/api'
import toast from 'react-hot-toast';

export const useApi = () => {

    const [hotels, setHotels] = useState(null);
    const getHotel = async () => {
        const response = await getHotelsRequest();
        if(response.error){
            return toast.error(
                response?.err?.response?.data?.message || 'Error al obtener los hoteles'
            )
        }
        setHotels(response.data.hotels);
    }

  return {
    hotels,
    isFetchingHotels: !hotels,
    getHotel
  }
}