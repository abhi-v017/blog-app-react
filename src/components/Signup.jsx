import React, { useState } from 'react'
import Input from './Input'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState()
    const create = async (data) => {
        setError('')
        try {
            const user = await authservice.createAccount(data)
            if (user) {
                const userData = await authservice.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate('/')
            }

        } catch (error) {
            console.log("Appwrite serive :: SignupComponent :: error", error);
        }
    }
    return (
        <div className='bg-zinc-700  flex justify-center flex-col items-center h-[90.1vh]'>
            <h2 className='text-center font-bold text-xl text-white p-3'>Create Your Account</h2>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)} className='bg-zinc-800 border-y-2 border-blue-800 p-6 rounded-2xl'>
                <div className='flex flex-col gap-4 items-center '>
                    <Input
                        type='text'
                        placeholder='Enter Your Name'
                        {...register('name', {
                            required: true
                        })}
                    />
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
                    <button type='submit' className='px-3 py-2 bg-blue-800 hover:bg-blue-900 cursor-pointer font-bold text-lg rounded-xl text-white'>Create Account</button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-white/40">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Login
                </Link>
            </p>
        </div>
    )
}

export default Signup
