import { useState } from 'react';
import toast from 'react-hot-toast';
import { reservationRequest } from '../../../services/api';

export const useAddReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function reservation(reservationData) {
    setIsLoading(true);
    const response = await reservationRequest(reservationData);
    setIsLoading(false);

    if (response.error) {
      setError(true);
      toast.error(response.err?.response?.data?.message || 'Error al crear la reservación');
      return;
    }

    setError(false);
    toast.success('Reservación creada exitosamente');
  }

  return {
    reservation,
    isLoading,
    error,
  };
};
