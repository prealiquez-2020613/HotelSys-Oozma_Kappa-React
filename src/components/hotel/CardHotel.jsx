export const HotelCard = ({ name, address, imageUrl }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg border border-gray-300 overflow-hidden shadow-md">
      <div className="overflow-hidden rounded-t-lg">
        <img 
          src={imageUrl} 
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
