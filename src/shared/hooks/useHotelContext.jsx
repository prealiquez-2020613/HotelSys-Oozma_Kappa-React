import { useContext } from 'react'
import { HotelsContext } from '../../context/HotelContext'
import toast from 'react-hot-toast'

export const useHotelContext = () => {

    const context = useContext(HotelsContext);
    if(!context){
        toast.error('Error al obtener información');
        return console.error('No existe el provedor del contexto');
    }
  return context
}