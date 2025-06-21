import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserData, setUserLoading } from "../redux/userSlice"

const useCurrentUser = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchUser = async() => {
            try {
                dispatch(setUserLoading(true))
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/current-user`, {withCredentials: true})
                dispatch(setUserData(response.data))
                dispatch(setUserLoading(false))
            } catch (error) {
                console.log(error)
                dispatch(setUserLoading(false))
            }
        }
        if(!userData) {
            fetchUser()
        } else {
            dispatch(setUserLoading(false))
        }
        
    }, [])
}

export default useCurrentUser