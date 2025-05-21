import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()
  const userIconUrl = 'https://cdn-icons-png.freepik.com/512/9307/9307950.png'

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      <div className="flex space-x-8">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 font-semibold"
        >
          Inicio
        </Link>
        <Link
          to="/reservation"
          className="text-gray-700 hover:text-blue-600 font-semibold"
        >
          Reservación
        </Link>
        <Link
          to="/hotels"
          className="text-gray-700 hover:text-blue-600 font-semibold"
        >
          Gestionar Hoteles
        </Link>
      </div>

      <button
        onClick={() => navigate('/login')}
        aria-label="Ir a login"
        className="focus:outline-none"
      >
        <img
          src={userIconUrl}
          alt="Usuario"
          className="h-7 w-7 object-contain"
        />
      </button>
    </nav>
  )
}
