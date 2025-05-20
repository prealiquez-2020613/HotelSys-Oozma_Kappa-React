import { useApi } from "../shared/hooks/useApi"
import { createContext, useEffect } from "react"

export const HotelsContext = createContext();

export const HotelProvider = ({children}) => {

    const {hotels, isFetchingHotels, getHotel} = useApi();
    useEffect(() => {
        getHotel()
    }, [])

  return (
    <HotelsContext.Provider value={{ hotels, isFetchingHotels }}>
        {children}
    </HotelsContext.Provider>
  )
}
