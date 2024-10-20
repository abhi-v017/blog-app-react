import React, { useState } from 'react'
import Input from './Input'
import { useNavigate, Link } from 'react-router-dom'
import { login as authlogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState()
    const login = async (data) => {
        setError("")
        try {
            const session = await authservice.login(data)
            if (session) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(authlogin(userData))
                navigate('/')
            }
        } catch (error) {
            console.log("Appwrite serive :: loginComponent :: error", error);
        }
    }
    return (
        <div className='bg-zinc-700  flex justify-center flex-col items-center h-[90.1vh]'>
            <h2 className='text-center font-bold text-xl text-white p-3'>Login to your Account</h2>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='bg-zinc-800 border-y-2 border-blue-800 p-6 rounded-2xl'>
                <div className='flex flex-col gap-4 items-center '>
                    <Input
                        type='email'
                        placeholder='Enter Your Email'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        type='password'
                        placeholder='Enter Your Password'
                        {...register('password', {
                            required: true,
                        })}
                    />
                    <button type='submit' className='text-white px-3 py-2 bg-blue-800 hover:bg-blue-900 cursor-pointer font-bold text-lg rounded-xl'>Login</button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-white/40">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

export default Login
