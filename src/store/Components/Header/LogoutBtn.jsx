import React from "react";
import { useDispatch } from 'react-redux'
import auth from '../../../appwrite/auth'
import { logout } from '../../authslice'

function LogOutBtn() {
    const dispatch = useDispatch()
    const logOutHandler = () => {
        auth.logout()
            .then(() => { dispatch(logout()) })
            .catch(() => console.log("Logout error"))
    }

    return (
        <div><button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logOutHandler}
        >Logout</button></div>
    )
}

export default LogOutBtn
