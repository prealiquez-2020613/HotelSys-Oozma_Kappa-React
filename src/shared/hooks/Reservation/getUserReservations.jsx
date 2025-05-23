import { useState } from 'react'
import { getUserReservation } from '../../../services/api';
import toast from 'react-hot-toast';

export const getUserReservations = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [reservations, setReservations] = useState([]);

    const getUserReservationsHook = async () => {
        setIsLoading(true)
        const idUserLogged = JSON.parse(localStorage.getItem("user"))
        const userId = idUserLogged?._id || idUserLogged?.uid || idUserLogged
        const response = await getUserReservation(userId)
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
