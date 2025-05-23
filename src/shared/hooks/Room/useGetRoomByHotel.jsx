import { useState } from 'react';
import { getRoomsByHotel } from '../../../services/api';
import toast from 'react-hot-toast';

export const useGetRoomByHotel = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [rooms, setRooms] = useState([]);

    async function getRoomsByHotelHook(idHotel) {
        setIsLoading(true);
        const response = await getRoomsByHotel(idHotel);

        if (response.error) {
            setError(true);
            toast.error(response.err?.response?.data?.message || 'Error al obtener habitaciones');
            setIsLoading(false);
            return;
        }

        setRooms(response.data);
        setIsLoading(false);
    }

    return {
        getRoomsByHotelHook,
        isLoading,
        error,
        rooms,
    };
};
