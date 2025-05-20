import React from 'react'
import { HotelsList } from '../../components/hotel/Hotel'
import '../login/login.css'
import { HotelProvider } from '../../context/HotelContext'

export const HotelPage = () => {
  return (
    <>
    <HotelProvider>
        <HotelsList />
    </HotelProvider>
    </>
  )
}