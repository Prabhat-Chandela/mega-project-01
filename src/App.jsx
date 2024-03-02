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
        <div className="max-w-screen min-h-screen bg-amber-100 text-black flex flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </>
    )
    : (<div className="w-screen h-screen bg-white text-gray-950">Loading......</div>)

}

export default App
