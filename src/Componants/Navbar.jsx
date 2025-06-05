import React from 'react'
import { NavLink as Navlink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 shadow-2xl backdrop-blur-md bg-opacity-80 w-[100vw]">
            <div className="w-[100vw] mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo or App Name */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg select-none">
                        Paste<span className="text-yellow-300">App</span>
                    </span>
                </div>
                {/* Navigation Links */}
                <div className="flex gap-6">
                    <Navlink
                        to="/"
                        className={({ isActive }) =>
                            `px-5 py-2 rounded-full font-semibold text-lg transition-all duration-300 shadow-md border
                            ${isActive
                                ? "bg-white text-blue-700 scale-105 border-2 border-yellow-300"
                                : "text-white hover:bg-yellow-300 hover:text-blue-700 hover:scale-105 hover:shadow-lg"}`
                        }
                    >
                        Home
                    </Navlink>
                    <Navlink
                        to="/pastes"
                        className={({ isActive }) =>
                            `px-5 py-2 rounded-full font-semibold text-lg transition-all duration-300 shadow-md border
                            ${isActive
                                ? "bg-white text-blue-700 scale-105 border-2 border-yellow-300"
                                : "text-white hover:bg-yellow-300 hover:text-blue-700 hover:scale-105 hover:shadow-lg"}`
                        }
                    >
                        Pastes
                    </Navlink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar