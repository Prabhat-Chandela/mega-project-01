import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as storeLogin } from '../../store/authSlice'
import { Inputbox, Logo, Button } from '../index'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth_service'
import { useForm } from 'react-hook-form'

function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(storeLogin({ userData }));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 border border-black/10 rounded-xl shadow-md">

            <div className='w-full sm:col-span-6 sm:rounded-tl-xl sm:rounded-bl-xl overflow-hidden'>
                <img className='w-full h-full object-cover' src="\signupImage.jpg" alt="signupSectionImage" />
            </div>

            <div className={`w-full sm:col-span-6 bg-[#fff] flex flex-col  gap-2 sm:rounded-tr-xl sm:rounded-br-xl p-5 sm:p-10  `} >

                <div className=" w-full flex justify-center text-orange-400 items-center ">
                    <Logo padding={"p-3 "} fill={'#fb923c'} />
                </div>

                <div className='flex flex-col gap-2 w-full justify-center mb-7'>

                    <h2 className="text-center text-xl sm:text-2xl text-orange-400 font-bold leading-tight w-full">Sign up to create account</h2>

                    <p className="mt-2 text-center text-base text-amber-100/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign-In
                        </Link>
                    </p>

                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                </div>

                <div className='flex flex-col gap-2'>

                    <form onSubmit={handleSubmit(signup)}>

                        <div className='space-y-5'>

                            <Inputbox
                                label="Full name"
                                labelbg={"bg-black"}
                                labelTextCol={"text-orange-400"}
                                className={'border-orange-400 py-4 text-orange-400'}
                                placeholder="Enter your name"
                                {...register("name", {
                                    required: true
                                })}
                            />

                            <Inputbox
                                label="Email"
                                labelbg={"bg-black"}
                                labelTextCol={"text-orange-400"}
                                placeholder="Enter your email"
                                className={'border-orange-400 py-4 text-orange-400'}
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
                                labelbg={"bg-black"}
                                labelTextCol={"text-orange-400"}
                                placeholder="Enter your password"
                                className={'border-orange-400 py-4 text-orange-400'}
                                type="password"
                                {...register("password", {
                                    required: true
                                })}
                            />

                            <Button type='submit' className={'font-bold'} >SignUp</Button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Signup