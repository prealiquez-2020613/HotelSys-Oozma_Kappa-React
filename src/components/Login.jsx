import { useState } from 'react'
import { useLogin } from '../shared/hooks/useLogin'
import { Link } from 'react-router-dom'

export const Login = () => {

  
  const background = "https://cdn.pixabay.com/photo/2022/04/26/13/14/background-7158357_1280.jpg"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {login} = useLogin()

  const [checkValidation, setCheckValidation] = useState(
    {username: undefined, password: undefined}
  )

  const disabledButton = checkValidation.username === "" && checkValidation.password === ""

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username,password)
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      username : value.length > 0 ? "" : 'Username field cannot be empty'
    })
    setUsername(value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      password : value.length > 0 ? "" : 'Password field cannot be empty'
    })
    setPassword(value)
  }

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2022/04/26/13/14/background-7158357_1280.jpg')" }}
    >
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h1 className="text-center text-3xl text-black font-bold pb-2 mb-5">
          INICIO DE SESIÓN
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
        <span className="text-center text-red-700 font-bold">{checkValidation.username}</span>
          <div>
            <input
              id="username"
              type="username"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-black"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <span className="text-center text-red-700 font-bold">{checkValidation.password}</span>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          
          <button
            disabled={!disabledButton}
            className="w-full px-4 py-3 rounded-lg bg-blue-900 text-white font-bold shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className=" mt-4 text-center text-white">
          Are you new here? 
          <Link className=" text-blue-600" to="/register"> Register</Link>
        </p>

      </div>
    </div>
  )
}