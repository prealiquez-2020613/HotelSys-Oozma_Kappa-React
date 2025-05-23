import { Link } from "react-router-dom"
import { DoorClosed, Hotel } from "lucide-react"

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">
            <div className="max-w-xl text-center bg-white p-10 rounded-2xl shadow-xl border border-blue-200">
                <div className="flex justify-center mb-6">
                    <Hotel className="h-12 w-12 text-blue-600" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-blue-800 mb-4">
                    Habitación no encontrada
                </h1>
                <p className="text-blue-700 mb-6">
                    Parece que la puerta que intentaste abrir no existe en este hotel. Tal vez tomaste el pasillo equivocado...
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                    <DoorClosed className="h-5 w-5" />
                    Volver al Lobby
                </Link>
            </div>
        </div>
    )
}
