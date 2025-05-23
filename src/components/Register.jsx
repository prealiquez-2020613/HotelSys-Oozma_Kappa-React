import { useState } from 'react'
import { useRegister } from '../shared/hooks/useRegister.jsx'
import { Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'

export const Register = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const { register } = useRegister()

  const [checkValidation, setCheckValidation] = useState({
    name: undefined,
    surname: undefined,
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
  })

  const disabledButton =
    checkValidation.name === "" &&
    checkValidation.surname === "" &&
    checkValidation.username === "" &&
    checkValidation.email === "" &&
    checkValidation.password === "" &&
    checkValidation.phone === ""

  const handleSubmit = (e) => {
    e.preventDefault()
    register(name, surname, username, email, password, phone)
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      name: value.length > 0 ? "" : 'Name field cannot be empty',
    })
    setName(value)
  }

  const handleSurnameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      surname: value.length > 0 ? "" : 'Surname field cannot be empty',
    })
    setSurname(value)
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      username: value.length > 0 ? "" : 'Username field cannot be empty',
    })
    setUsername(value)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      email: /\S+@\S+\.\S+/.test(value) ? "" : 'Email is not valid',
    })
    setEmail(value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      password: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(value)
        ? ""
        : 'Password must be 8-16 chars, with digit, upper, lower and special char.',
    })
    setPassword(value)
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      phone: value.length >= 8 ? "" : 'Phone needs to be over 8 digits',
    })
    setPhone(value)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-blue-200">
        <div className="flex justify-center mb-6">
          <UserPlus className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-blue-800 mb-6 text-center">
          REGISTRO
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <input
              id="name"
              type="text"
              placeholder="Name"
              className={`w-full px-4 py-3 rounded-lg border ${
                checkValidation.name ? 'border-red-600' : 'border-blue-300'
              } text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
              value={name}
              onChange={handleNameChange}
              autoComplete="given-name"
            />
            {checkValidation.name && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.name}</p>
            )}
          </div>

          <div>
            <input
              id="surname"
              type="text"
              placeholder="Surname"
              className={`w-full px-4 py-3 rounded-lg border ${
                checkValidation.surname ? 'border-red-600' : 'border-blue-300'
              } text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
              value={surname}
              onChange={handleSurnameChange}
              autoComplete="family-name"
            />
            {checkValidation.surname && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.surname}</p>
            )}
          </div>

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
              id="email"
              type="email"
              placeholder="Email"
              className={`w-full px-4 py-3 rounded-lg border ${
                checkValidation.email ? 'border-red-600' : 'border-blue-300'
              } text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
            />
            {checkValidation.email && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.email}</p>
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
              autoComplete="new-password"
            />
            {checkValidation.password && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.password}</p>
            )}
          </div>

          <div>
            <input
              id="phone"
              type="tel"
              placeholder="Phone"
              className={`w-full px-4 py-3 rounded-lg border ${
                checkValidation.phone ? 'border-red-600' : 'border-blue-300'
              } text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition`}
              value={phone}
              onChange={handlePhoneChange}
              autoComplete="tel"
            />
            {checkValidation.phone && (
              <p className="mt-1 text-sm text-red-600 font-semibold">{checkValidation.phone}</p>
            )}
          </div>

          <button
            disabled={!disabledButton}
            type="submit"
            className={`w-full px-4 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
              disabledButton
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-blue-700">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
