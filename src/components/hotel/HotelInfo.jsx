export const HotelInfo = ({ name, address, category, description, imageUrl }) => {

    const starsCount = (() => {
    switch (category) {
      case "ONE STAR": return 1
      case "TWO STARS": return 2
      case "THREE STARS": return 3
      case "FOUR STARS": return 4
      case "FIVE STARS": return 5
      default: return 0
    }
  })()

  return (
    <div className="flex max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md space-x-8">
      <img
        src={imageUrl}
        alt={`Imagen de ${name}`}
        className="w-80 h-80 object-cover rounded-lg"
      />

      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-bold">{name}</h2>

        <div className="flex items-center mt-1 mb-4 text-gray-700 font-semibold text-lg">
          <span className="mr-2 text-yellow-500">⭐</span>
          <span>{starsCount} Estrella{starsCount > 1 ? "s" : ""}</span>
        </div>

        <p className="text-gray-800 mb-6 max-w-xl">
          <strong>Descripción: </strong> {description}
        </p>

        <div className="flex items-center text-lg font-bold">
          <span>Ubicación</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21c-4-3-7-6.5-7-10a7 7 0 1114 0c0 3.5-3 7-7 10z"
            />
          </svg>
        </div>

        <p className="text-gray-800 max-w-xl mt-1">{address}</p>
      </div>
    </div>
  )
}
