import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth_service"
import { login, logout } from "./store/authSlice"
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {

    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))

        } else {
          dispatch(logout())
        }

      })
      .finally(setLoading(false))
  }, [])

  return !loading ?
    (
      <>
        <div className="w-screen h-screen bg-gray-950 text-white">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </>
    )
    : (<div className="w-screen h-screen bg-gray-950 text-white">Loading......</div>)

}

export default App
