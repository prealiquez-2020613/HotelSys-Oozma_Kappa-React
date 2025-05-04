import { useState } from 'react'
import {useRegister} from '../shared/hooks/useRegister.jsx'
import { Link } from 'react-router-dom'

export const Register = () => {

  
  const background = "https://cdn.pixabay.com/photo/2022/04/26/13/14/background-7158357_1280.jpg"

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const {register} = useRegister()

  const [checkValidation, setCheckValidation] = useState(
    {name: undefined, surname: undefined, username: undefined, email: email, password: undefined, phone: undefined}
  )

  const disabledButton = checkValidation.name === "" &&
                          checkValidation.surname === "" &&
                          checkValidation.username === "" &&
                          checkValidation.email === "" &&
                          checkValidation.password === "" &&
                          checkValidation.phone === ""

  const handleSubmit = (e) => {
    e.preventDefault()
    register(name,surname,username,email,password,phone)
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      name : value.length > 0 ? "" : 'Name field cannot be empty'
    })
    setName(value)
  }

  const handleSurnameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      surname : value.length > 0 ? "" : 'Surname field cannot be empty'
    })
    setSurname(value)
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      username : value.length > 0 ? "" : 'Username field cannot be empty'
    })
    setUsername(value)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      email : /\S+@\S+\.\S+/.test(value) ? "" : 'Email is not valid'
    })
    setEmail(value)
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      password : /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(value) ? "" : 'Password must be between 8 and 16 characters, at least one digit, at least one lower case letter, at least one upper case letter and at least one non-alphanumeric character.'
    })
    setPassword(value)
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setCheckValidation({
      ...checkValidation,
      phone : value.length >= 8 ? "" : 'Phone needs to be over 8 digits'
    })
    setPhone(value)
  }

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2022/04/26/13/14/background-7158357_1280.jpg')" }}
    >
      <div className="w-full max-w-sm bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h1 className="text-center text-3xl text-black font-bold pb-2 mb-5">
          REGISTRO
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>

          <span className="text-center text-red-700 font-bold">{checkValidation.name}</span>
            <input
              id="name"
              type="name"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <span className="text-center text-red-700 font-bold">{checkValidation.surname}</span>
          <div>
            <input
              id="surname"
              type="surname"
              placeholder="Surname"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-black"
              value={surname}
              onChange={handleSurnameChange}
            />
          </div>

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

          <span className="text-center text-red-700 font-bold">{checkValidation.email}</span>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={handleEmailChange}
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

          <span className="text-center text-red-700 font-bold">{checkValidation.phone}</span>
          <div>
            <input
              id="phone"
              type="phone"
              placeholder="phone"
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white text-black placeholder-gray focus:outline-none focus:ring-2 focus:ring-black"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          
          <button
            disabled={!disabledButton}
            className="w-full px-4 py-3 rounded-lg bg-blue-900 text-white font-bold shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Register
          </button>
        </form>

        <p className=" mt-4 text-center text-white">
          Already have an account? 
          <Link className=" text-blue-600" to="/"> Sign In</Link>
        </p>

      </div>
    </div>
  )
}