import React from 'react'
import { FaBell, FaUserCircle } from "react-icons/fa";

function Header() {
    return (
        <div className='h-18 items-center px-6 justify-between flex top-0 bg-purple-500 w-screen shadow-lg'>
            <div className="flex items-center gap-4">
                <img src="https://microcareacademy.azurewebsites.net/images/logo-2.png" alt="vite" className='object-fit h-12 bg-white rounded-lg px-4 py-1'  />
                <h1 className='text-white font-bold text-3xl'>Welcome to Microcare, </h1>
            </div>
            <div className="flex items-center gap-4">
                <FaBell size={24} color='white'  className='cursor-pointer' />
                <FaUserCircle size={36} color='white' className='cursor-pointer' />
            </div>
        </div>
    )
}

export default Header
