import { useNavigate } from 'react-router-dom'

export const HotelCard = ({ _id, name, address, imageUrl }) => {
  const navigate = useNavigate()

  const goToHotelInfo = () => {
    navigate(`/hotel/${_id}`)
  }

  return (
    <div
      onClick={goToHotelInfo}
      className="max-w-sm w-full bg-white rounded-lg border border-gray-300 overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') goToHotelInfo() }}
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={`Imagen de ${name}`}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-1">{name}</h2>
        <p className="text-gray-600 font-semibold mb-2">{address}</p>
      </div>
    </div>
  )
}
