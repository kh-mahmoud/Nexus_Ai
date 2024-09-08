import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const DashboardLayout = () => {

  const { userId, isLoaded } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {

    if (isLoaded && !userId) {
      navigate("/sign-in")
    }


  }, [userId, isLoaded, navigate])

  if (!isLoaded) return <div className="h-[calc(100vh-60px)] flex-col-center">Loading...</div>
  
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
