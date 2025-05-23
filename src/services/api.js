import axios from "axios";

const apiClient = axios.create(
  {
    baseURL: 'http://localhost:3626',
    timeout: 2000
  }
)

apiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token
        }
        return config
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
export const loginRequest = async (user) => {
  try {
    const res = await apiClient.post('/login', user)
    console.log(res);

    return { error: false, data: res.data }
  } catch (err) {
    return {
      error: true,
      status: err.response?.status,
      message: err.response?.data?.message || 'Error inesperado',
      err
    }
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

//create
export const createHotel = async (hotel) => {
  try {
    return await apiClient.post('/v1/hotel/createHotel', hotel)
  } catch (err) {
    return { error: true, err }
  }
}

//read
export const getAllHotels = async () => {
  try {
    return await apiClient.get('/v1/hotel/getAllHotels', {
      headers: {
        skipAuth: true
      }
    })
  } catch (err) {
    return { error: true, err }
  }
}

//update
export const updateHotel = async(id, hotelData)=>{
  try {
    return await apiClient.put(`/v1/hotel/updateHotel/${id}`, hotelData)
  } catch (err) {
    return {error: true, err}
  }
}

//delete
export const deleteHotel = async(id)=>{
  try {
    return await apiClient.delete(`/v1/hotel/deleteHotel/${id}`)
  } catch (err) {
    return {error: true, err}
  }
}

//RUTA RESERVATION

//create
export const reservationRequest = async (user) => {
  try {
    return await apiClient.post('/V1/Reservation/createReservation', user, { type: 'multipart/form-data' })
  } catch (err) {
    return { error: true, err }
  }
}

//getUserReservation
export const getUserReservation = async () => {
  try {
    return await apiClient.get('/V1/Reservation/getUserReservations')
  } catch (err) {
    return { error: true, err }
  }
}

//cancelReservation
export const cancelReservation = async (reservationId) => {
  try {
    return await apiClient.put('/V1/Reservation/cancelReservation', { reservationId })
  } catch (err) {
    return { error: true, err }
  }
}

//RUTA ROOMS

//getByHotel
export const getRoomsByHotel = async (idHotel) => {
  try {
    return await apiClient.get(`/v1/Room/getRoomsByHotel?idHotel=${idHotel}`)
  } catch (err) {
    return { error: true, err }
  }
}