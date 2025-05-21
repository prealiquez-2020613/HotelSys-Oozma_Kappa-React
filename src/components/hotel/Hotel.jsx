import { useState } from 'react'
import { useHotelContext } from '../../shared/hooks/useHotelContext'
import { HotelCard } from './CardHotel'

const carouselImages = [
  { url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/215129867.jpg?k=aa615ee89da2d9a4b2565cd8e5ad3675f5418b93c09d95cd8ed7dd2230bb29c3&o=&hp=1https://cf.bstatic.com/xdata/images/hotel/max1280x900/298079106.jpg?k=c47301cdaee6ed8b936a1108551afec2328fcc91c1efa45f407f78381fdbd58b&o=&hp=1' },
  { url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/302502549.jpg?k=46180c1ae0c1b139e1bb070382feae9666861b3c4ba1b75173ec0621c63ee6da&o=&hp=1' },
  { url: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/122998945.jpg?k=73d277d1e795eb90ef0ad077250d92dad498d98086db1e25c938b5fa6af4771f&o=&hp=1' },
]

export const HotelsList = () => {
  const { hotels, isFetchingHotels } = useHotelContext()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  if (isFetchingHotels) return <div>Cargando hoteles...</div>
  if (!hotels || hotels.length === 0) return <div>No hay hoteles disponibles.</div>

  const filteredHotels = selectedCategory
    ? hotels.filter(hotel => hotel.category === selectedCategory)
    : hotels

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">

      <div className="relative w-full h-100 mb-8 overflow-hidden rounded-lg shadow-lg">
        <img
          src={carouselImages[currentSlide].url}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-100 object-cover"
        />

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
          aria-label="Anterior"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
          aria-label="Siguiente"
        >
          &#10095;
        </button>
      </div>

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
              _id={hotel._id}
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
