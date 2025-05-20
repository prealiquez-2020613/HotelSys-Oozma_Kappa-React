import { useState } from 'react'
import { useHotelContext } from '../../shared/hooks/useHotelContext'
import { HotelCard } from './CardHotel'

export const HotelsList = () => {
  const { hotels, isFetchingHotels } = useHotelContext()
  const [selectedCategory, setSelectedCategory] = useState('')

  if (isFetchingHotels) return <div>Cargando hoteles...</div>
  if (!hotels || hotels.length === 0) return <div>No hay hoteles disponibles.</div>

  const filteredHotels = selectedCategory
    ? hotels.filter(hotel => hotel.category === selectedCategory)
    : hotels

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6 space-x-4">
        <h2 className="text-3xl font-bold whitespace-nowrap">Descubre Hoteles</h2>
        <select
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Filtrar por estrellas --</option>
          <option value="ONE STAR">1 Estrella</option>
          <option value="TWO STARS">2 Estrellas</option>
          <option value="THREE STARS">3 Estrellas</option>
          <option value="FOUR STARS">4 Estrellas</option>
          <option value="FIVE STARS">5 Estrellas</option>
        </select>
      </div>

      {filteredHotels.length === 0 ? (
        <div>No se encontraron hoteles con ese filtro.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard
              key={hotel._id}
              name={hotel.name}
              address={hotel.address}
              imageUrl={hotel.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  )
}
