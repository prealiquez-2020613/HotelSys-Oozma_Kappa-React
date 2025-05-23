import { useState } from 'react';
import { updateHotel as updateHotelService } from '../../../services/api';

export const useUpdateHotel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHotel = async (id, hotelData) => {
    setIsLoading(true);
    setError(null);
    console.log('Editando hotel con ID:', id);
    console.log('Datos enviados:', hotelData);
    const response = await updateHotelService(id, hotelData);
    setIsLoading(false);
    if (response.error) {
      setError(response.message);
    }
    return response;
  };

  return {
    updateHotel,
    isLoading,
    error
  };
};
