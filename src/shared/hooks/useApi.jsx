import { useState } from 'react'
import { getHotelsRequest, findHotelRequest } from '../../services/api'
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

    const [hotel, setHotel] = useState(null)
    const findHotel = async (hotelId) => {
      if(!hotelId) return;
      const response = await findHotelRequest(hotelId);
      if(response.error){
        return toast.error(
          response?.err?.response?.data?.message || 'Error al obtener el hotel'
        )
      }
      setHotel(response.data.hotel);
    }
    
  return {
    hotels,
    isFetchingHotels: !hotels,
    getHotel,
    hotel,
    isFetchingHotel: !hotel,
    findHotel
  }
}