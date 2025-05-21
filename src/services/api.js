import axios from "axios";

const apiClient = axios.create(
  {
    baseURL: 'http://localhost:3626',
    timeout: 2000
  }
)

//RUTA REGISTER
export const registerRequest = async(user)=>{
  try {
    return await apiClient.post('/register', user, {type: 'multipart/form-data'})
  } catch (err) {
    return {error : true, err}
  }
}

//RUTA LOGIN
export const loginRequest = async(user)=>{
  try {
    return await apiClient.post('/login', user, {type: 'multipart/form-data'})
  } catch (err) {
    return {error : true, err}
  }
}

//RUTA HOTEL
export const getHotelsRequest = async()=>{
  try {
    return await apiClient.get('/v1/hotel/getAllHotels')
  } catch (err) {
    return {error : true, err}
  }
}

export const findHotelRequest = async(hotelId)=>{
  try {
    return await apiClient.get(`/v1/hotel/getHotel/${hotelId}`)
  } catch (err) {
    return {error : true, err}
  }
}