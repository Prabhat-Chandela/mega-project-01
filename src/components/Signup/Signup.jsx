import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../../store/authSlice'
import { Inputbox } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth_service'
import { useForm } from 'react-hook-form'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handelSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="flex items-center justify-center">

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                <div className="mb-2 flex justify-center">

                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>

                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handelSubmit(signup)}>

                    <div className='space-y-5'>

                        <Inputbox
                            label="Full name"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true
                            })}
                        />

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
                            {...register("password" , {
                                required: true
                            })}
                        />

                        <button type='submit'>SignUp</button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default Signup