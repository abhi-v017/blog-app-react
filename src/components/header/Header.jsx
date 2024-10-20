import React from 'react'
import Container from '../container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../../store/authSlice'
import authservice from '../../appwrite/auth'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authservice.logout().then(() => {
      dispatch(logout())
    })
    navigate('/')
  }
  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Sign Up',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    },
    {
      name: 'All Post',
      slug: '/all-post',
      active: authStatus
    }
  ]
  return (
    <header className='bg-zinc-800 text-white font-bold text-center'>
      <Container>
        <nav>
          <ul className='flex justify-between items-center px-6'>
            <h1 className='logo-font text-zinc-500 cursor-pointer'>blog</h1>
            <div className='flex items-center gap-4 py-2'>
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className='px-3 py-2 border-y border-zinc-800 hover:border-y hover:border-blue-700 rounded-3xl'>
                    <button onClick={() => navigate(item.slug)}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <Link to='/'>
                    <button className='px-3 py-2 border-y border-zinc-800 hover:border-y hover:border-blue-700 rounded-3xl'
                      onClick={logoutHandler}>logout</button>
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
