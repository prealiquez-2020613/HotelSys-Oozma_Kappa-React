import React, { useEffect, useState } from 'react';
import { useAddReservation } from '../shared/hooks/Reservation/useAddReservation';
import { useGetHotels } from '../shared/hooks/Hotel/useGetHotels';
import { useGetRoomByHotel } from '../shared/hooks/Room/useGetRoomByHotel';
import { getUserReservations } from '../shared/hooks/Reservation/getUserReservations'
import { useCancelReservation } from '../shared/hooks/Reservation/useCancelReservation';
import toast from 'react-hot-toast';

export const ReservationForm = () => {
    const { getHotels, hotels } = useGetHotels();
    const { getRoomsByHotelHook, rooms } = useGetRoomByHotel();
    const { getUserReservationsHook, reservations } = getUserReservations();
    const { reservation } = useAddReservation();
    const { cancelReservationHook } = useCancelReservation();

    const [form, setForm] = useState({
        user: localStorage.getItem('userId'), // Obtener el ID del usuario desde localStorage
        hotel: '',
        room: '',
        checkIn: '',
        checkOut: '',
        services: [],
        totalPrice: 0,
        status: 'CONFIRMED',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getHotels();
        getUserReservationsHook(); // Cargar reservaciones del usuario al montar el componente
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));

        if (name === 'hotel') {
            getRoomsByHotelHook(value); // Cargar habitaciones al seleccionar un hotel
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.hotel) newErrors.hotel = 'El hotel es obligatorio';
        if (!form.room) newErrors.room = 'La habitación es obligatoria';
        if (!form.checkIn) newErrors.checkIn = 'La fecha de check-in es obligatoria';
        if (!form.checkOut) newErrors.checkOut = 'La fecha de check-out es obligatoria';
        if (new Date(form.checkIn) >= new Date(form.checkOut)) newErrors.checkOut = 'La fecha de check-out debe ser posterior a la de check-in';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await reservation(form);
            setForm({
                user: localStorage.getItem('userId'),
                hotel: '',
                room: '',
                checkIn: '',
                checkOut: '',
                services: [],
                totalPrice: 0,
                status: 'CONFIRMED',
            });
            getUserReservationsHook(); // Refrescar el historial de reservaciones
        } catch (error) {
            console.error(error);
            toast.error('Error de conexión o inesperado');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (reservationId) => {
        const confirm = window.confirm('¿Estás seguro de cancelar esta reservación?');
        if (!confirm) return;

        await cancelReservationHook(reservationId);
        getUserReservationsHook(); // Refrescar el historial de reservaciones
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Crear Reservación</h2>
            <form onSubmit={handleSubmit}>
                {/* Selección de Hotel */}
                <div className="mb-4">
                    <label htmlFor="hotel" className="block text-sm font-medium text-gray-700">Hotel</label>
                    <select name="hotel" value={form.hotel} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500 ${errors.hotel ? 'border-red-500' : ''}`}>
                        <option value="">Seleccione un hotel</option>
                        {hotels.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                        ))}
                    </select>
                    {errors.hotel && <p className="text-red-500 text-sm">{errors.hotel}</p>}
                </div>

                {/* Selección de Habitación */}
                <div className="mb-4">
                    <label htmlFor="room" className="block text-sm font-medium text-gray-700">Habitación</label>
                    <select name="room" value={form.room} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500 ${errors.room ? 'border-red-500' : ''}`}>
                        <option value="">Seleccione una habitación</option>
                        {rooms.map((room) => (
                            <option key={room._id} value={room._id}>{room.name}</option>
                        ))}
                    </select>
                    {errors.room && <p className="text-red-500 text-sm">{errors.room}</p>}
                </div>

                {/* Fechas de Check-in y Check-out */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in</label>
                        <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500 ${errors.checkIn ? 'border-red-500' : ''}`} />
                        {errors.checkIn && <p className="text-red-500 text-sm">{errors.checkIn}</p>}
                    </div>
                    <div>
                        <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out</label>
                        <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-500 ${errors.checkOut ? 'border-red-500' : ''}`} />
                        {errors.checkOut && <p className="text-red-500 text-sm">{errors.checkOut}</p>}
                    </div>
                </div>

                {/* Botón de Enviar */}
                <button type="submit" disabled={loading} className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition duration-200">
                    {loading ? 'Guardando...' : 'Crear Reservación'}
                </button>
            </form>

            {/* Tabla de Reservaciones */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Historial de Reservaciones</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Hotel</th>
                        <th className="border px-4 py-2">Habitación</th>
                        <th className="border px-4 py-2">Check-in</th>
                        <th className="border px-4 py-2">Check-out</th>
                        <th className="border px-4 py-2">Estado</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td className="border px-4 py-2">{reservation.hotel.name}</td>
                                <td className="border px-4 py-2">{reservation.room.name}</td>
                                <td className="border px-4 py-2">{new Date(reservation.checkIn).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{new Date(reservation.checkOut).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{reservation.status}</td>
                                <td className="border px-4 py-2">
                                    {reservation.status === 'CONFIRMED' ? (
                                        <button onClick={() => handleCancel(reservation._id)} className="text-red-500 hover:underline">
                                            Cancelar
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 italic">Cancelada</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border px-4 py-2 text-center">No hay reservaciones</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
