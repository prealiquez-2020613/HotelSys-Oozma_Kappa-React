import { useState } from 'react'
import { getUserReservation } from '../../../services/api';

export const getUserReservations = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [reservations, setReservations] = useState([]);

    const getUserReservationsHook = async () => {
        setIsLoading(true)
        const idUserLogged = localStorage.getItem("user")
        const response = await getUserReservation(idUserLogged.uid)
        setIsLoading(false)

        if (response.error) {
            setError(true);
            toast.error(response.err?.response?.data?.message || 'Error al obtener las reservaciones');
            return;
        }

        setError(false);
        setReservations(response.data.reservations)
        toast.success('Reservaciones obtenidas exitosamente');
    }

    return {
        reservations, isLoading, error, getUserReservationsHook
    }
}
