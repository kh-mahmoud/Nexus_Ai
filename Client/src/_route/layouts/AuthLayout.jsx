import { useAuth } from "@clerk/clerk-react"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"




const AuthLayout = () => {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        if (isLoaded && userId) {
            navigate("/dashboard")
        }


    }, [userId, isLoaded, navigate])

    if (!isLoaded) return

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default AuthLayout;
