import './App.css'
import { Footer, Header } from './components/index'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'
import service from './appwrite/auth'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'


function App() {
  const [loading, setLoding] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    service.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoding(false))
  }, [])

  return !loading ? (
    <>
      <Header />
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  ) : null
}

export default App