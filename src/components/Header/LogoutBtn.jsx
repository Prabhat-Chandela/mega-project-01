import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth_service'
import { logout } from '../../store/authSlice'
import { Button } from '../index'
import { VscArrowSmallRight } from "react-icons/vsc";

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })
  }

  return (
    <>
      <Button className={"hidden sm:block"} bgColor={"bg-black"} textColor={"text-orange-300"} onClick={logoutHandler}>Logout</Button>
      <Button className={"block text-xl sm:hidden"} bgColor={"bg-black"} textColor={"text-orange-300"} onClick={logoutHandler}><VscArrowSmallRight /></Button>
    </>
  )
}

export default LogoutBtn