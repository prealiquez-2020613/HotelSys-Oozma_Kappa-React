import { useContext } from 'react'
import { FindHotelContext } from '../../context/FindHotelContext'
import toast from 'react-hot-toast'

export const useFindHotelContext = () => {

    const context = useContext(FindHotelContext);
    if(!context){
        toast.error('Error al obtener información');
        return console.error('No existe el provedor del contexto');
    }
  return context
}