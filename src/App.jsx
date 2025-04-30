import { useState } from 'react'
import './App.css'
import AuthService from './appwrite/auth'
import { Header, Footer } from './store/Components'
import { login, logout } from './store/authslice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  // try {
  //   const authStatus = useSelector((state) => state.password)
  //   if (authStatus) {
  //     console.log(authStatus)
  //   }
  // } catch (error) {
  //   console.log(error)
  // }

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        dispatch(login({ userData }))
      })
      .catch(() => {
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  if (loading) {
    return <div> Loading.... </div>
  } else {


    return (
      <div className='text-center w-full text-5xl font-bold text-red-700'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        test
      </div>
    )
  }

  // return !loading ? (<div className='text-center w-full h-screen text-5xl font-bold text-red-700'>test</div>) : (<div>Loading...</div>)
}

export default App
