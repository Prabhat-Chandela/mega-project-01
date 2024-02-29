import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../../store/authSlice'
import { Inputbox , Logo , Button } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth_service'
import { useForm } from 'react-hook-form'


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(storeLogin({userData}));
          navigate("/")
        }
      }
    } catch (error) {
      setError(error)
    }

  }

  return (
    <div className={`mx-auto w-full max-w-lg bg-gray-950 text-white rounded-xl p-10 border border-black/10`}>
      <div className="w-full flex justify-center items-center">

          <Logo padding={"p-3"}/>
      
      </div>

      <div className='flex flex-col gap-2 w-full justify-center'>

        <h2 className="text-center text-2xl font-bold leading-tight">Log-In to your account</h2>

        <p className="mt-2 text-center text-base text-slate-300/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

      </div>

      <div className='flex flex-col gap-2'>

        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Inputbox
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />

            <Inputbox
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type='submit'>LogIn</Button>

          </div>
        </form>
      </div>

    </div>
  )
}

export default Login