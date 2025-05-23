import { useState } from 'react'
import { cancelReservation } from '../../../services/api'
import toast from 'react-hot-toast';


export const useCancelReservation = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const cancelReservationHook = async (id) => {
        setIsLoading(true)
        const response = await cancelReservation(id)
        setIsLoading(false)

        if (response.error) {
            setError(true);
            toast.error(response.err?.response?.data?.message || 'Error al cancelar la reservación');
            return;
        }

        setError(false);
        toast.success('Reservación cancelada exitosamente');
    }
    return {
        cancelReservationHook, isLoading, error
    }
}
