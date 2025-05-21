import { useApi } from "../shared/hooks/useApi"
import { createContext, useEffect } from "react"

export const FindHotelContext = createContext();

export const FindHotelProvider = ({children}) => {

    const {hotel, isFetchingHotel, findHotel} = useApi();
    useEffect(() => {
        findHotel()
    }, [])

  return (
    <FindHotelContext.Provider value={{ hotel, isFetchingHotel }}>
        {children}
    </FindHotelContext.Provider>
  )
}