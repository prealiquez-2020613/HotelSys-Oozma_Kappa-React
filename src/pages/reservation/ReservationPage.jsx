import React from 'react';
import { ReservationForm } from '../../components/ReservationForm';

export const ReservationPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center font-sans">
            <h2 className="text-4xl font-extrabold text-teal-700 mb-8 select-none border-b-4 border-teal-300 pb-2 w-full max-w-6xl text-center">
                Administración de Reservaciones
            </h2>
            <div className="w-full max-w-6xl">
                <ReservationForm />
            </div>
        </div>
    );
};
