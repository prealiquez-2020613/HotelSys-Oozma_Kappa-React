import { useState } from "react"
import toast from 'react-hot-toast'
import { createHotel } from "../../../services/api"

export const useAddHotel = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    async function setHotel(hotel) {
        setIsLoading(true)
        const response = await createHotel(hotel);

        if (response.error) {
            setError(true)

            if (response?.err?.response?.data?.errors) {
                let arrayErrors = response?.err?.response?.data?.errors
                for (const error of arrayErrors) {
                    return toast.error(error.msg)
                }
            }

            setIsLoading(false)
            return {error: true}
        }

        toast.success("Hotel added successfully!")
        setIsLoading(false)
        return response
    }
    return {
        setHotel, isLoading, error
    }
}
