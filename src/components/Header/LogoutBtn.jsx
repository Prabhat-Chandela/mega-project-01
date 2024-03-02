import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth_service'
import {logout} from '../../store/authSlice'
import {Button} from '../index'

function LogoutBtn() {
    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        authService.logout()
                    .then(()=>{
                        dispatch(logout())
                    })
    }

  return (
    <Button bgColor={"bg-black"} textColor={"text-orange-300"} onClick={logoutHandler}>Logout</Button>
  )
}

export default LogoutBtn