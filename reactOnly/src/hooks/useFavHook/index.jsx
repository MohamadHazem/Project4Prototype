import { createContext, useContext, useState, useEffect } from "react";
import { useUserHook } from "../useUserHook";
import project4BackendAxios from "../../configs/project4BackendConfig"
import { Toast } from "react-bootstrap";

const FavContext = createContext()

export function useFavHook() {
    if (!FavContext) {
        throw new Error("You must use inside FavContext.Provider")
    }
    return useContext(FavContext)
}

export function FavProvider({children}) {
    const [fav, setFav] = useState([])
    const userHook = useUserHook()
    const [favUpdated, setFavUpdated] = useState(false)
    const [message, setMessage] = useState('')

    const [showMessage, setShowMessage] = useState(false);
    const toggleShowToast = () => setShowMessage(!showMessage)

    useEffect(() => {
        const fetchFavData = async () => {
            if (!userHook.user) {
                return
            }
            try {
                const res = await project4BackendAxios.get('/fav', {
                    headers: {
                        authorization: `Bearer ${userHook.user.token}`
                    }
                })
                if (res.status === 200) {
                    const tempFav = res.data
                    setFav(tempFav)
                    setFavUpdated(false)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchFavData()
    }, [userHook.user, favUpdated])

    useEffect(() => {
        if (!message) {
            return
        }
        toggleShowToast()
        setTimeout(() => {
            setShowMessage(false)
            setMessage('')
        }, 2000)
    }, [message])

    async function addCarToFav(carId) {
        try {
          await project4BackendAxios.post('/fav', {carId: carId} ,{
            headers: {
                authorization: `Bearer ${userHook.user.token}`
            }
          })
          setFavUpdated(true)
          setMessage('Added to favorites')
        } catch (err) {
            if (err.response.status === 400 && err.response.data.message === 'Car already in favorites') {
                setMessage('Car already in favorites')
            }
            console.log(err)
        }
    }
    
    return (
        <FavContext.Provider value={{fav, setFav, favUpdated, setFavUpdated, addCarToFav}}>
            <Toast show={showMessage} style={{position: 'fixed', zIndex: 5, textAlign: 'center', top: "5%", left: "50%", transform: "translateX(-50%)"}}>
                <Toast.Body className="fw-medium fs-6">{message}</Toast.Body>
            </Toast>
            {children}
        </FavContext.Provider>
    )
}