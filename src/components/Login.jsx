import { useState } from 'react'
import { useLogin } from '../shared/hooks/useLogin'
import { Link } from 'react-router-dom'
import { DoorClosed } from 'lucide-react'

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useLogin()

  const [checkValidation, setCheckValidation] = useState({
    username: undefined,
    password: undefined,
  })

  const disabledButton = checkValidation.username === "" && checkValidation.password === ""

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      username: value.length > 0 ? "" : 'Username field cannot be empty',
    })
    setUsername(value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      password: value.length > 0 ? "" : 'Password field cannot be empty',
    })
    setPassword(value)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-blue-200">
        <h1 className="text-3xl font-serif font-bold text-blue-800 mb-6 text-center">
          INICIO DE SESIÓN
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className={`w-full px-4 py-3 rounded-lg border ${
                checkValidation.username ? 'border-red-600' : 'border-blue-300'
              } text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
              value={username}
              onChange={handleUsernameChange}
              autoComplete="username"
            />
            {checkValidation.username && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.username}</p>
            )}
          </div>

          <div>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className={`w-full px-4 py-3 rounded-lg border ${
                checkValidation.password ? 'border-red-600' : 'border-blue-300'
              } text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {checkValidation.password && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.password}</p>
            )}
          </div>

          <button
            disabled={!disabledButton}
            className={`w-full px-4 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
              disabledButton
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-blue-700">
          Are you new here?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

        <div className="mt-8 flex justify-center">
          <DoorClosed className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </div>
  )
}
