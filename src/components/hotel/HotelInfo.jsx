import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const HotelInfo = () => {
  const { hotelId } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3626/v1/hotel/getHotel/${hotelId}`)
        setHotel(data.hotel)
      } catch (err) {
        setError('Error al cargar información del hotel')
      } finally {
        setLoading(false)
      }
    }

    fetchHotel()
  }, [hotelId])

  if (loading) return <div className="pt-24 text-center">Cargando hotel...</div>
  if (error) return <div className="pt-24 text-center">{error}</div>
  if (!hotel) return <div className="pt-24 text-center">Hotel no encontrado</div>

  const starsCount = (() => {
    switch (hotel.category) {
      case 'ONE STAR': return 1
      case 'TWO STARS': return 2
      case 'THREE STARS': return 3
      case 'FOUR STARS': return 4
      case 'FIVE STARS': return 5
      default: return 0
    }
  })()

  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto pt-24 px-16 space-y-8 md:space-y-0 md:space-x-14">
      <img
        src={hotel.imageUrl}
        alt={`Imagen de ${hotel.name}`}
        className="w-full md:w-[500px] h-100 object-cover rounded-md"
      />

      <div className="flex flex-col justify-center max-w-4xl text-justify">
        <h2 className="text-5xl font-bold leading-tight">{hotel.name}</h2>

        <div className="flex items-center mt-2 mb-6 text-gray-700 font-semibold text-xl">
          <span className="mr-3 text-yellow-500 text-2xl">⭐</span>
          <span>{starsCount} Estrella{starsCount > 1 ? 's' : ''}</span>
        </div>

        <p className="text-gray-900 text-lg leading-relaxed mb-8">
          <strong>Descripción: </strong> {hotel.description}
        </p>

        <div className="flex items-center text-xl font-bold mb-1">
          <span>Ubicación</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-3-7-6.5-7-10a7 7 0 1114 0c0 3.5-3 7-7 10z" />
          </svg>
        </div>

        <p className="text-gray-900 text-lg max-w-3xl">{hotel.address}</p>
      </div>
    </div>
  )
}
