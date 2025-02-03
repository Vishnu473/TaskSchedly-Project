import 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className='px-10 bg-white text-gray-900 flex h-16 items-center justify-between shadow-md shadow-white-900'>
    <NavLink to="/taskSchedly"
    className={({isActive}) => `text-3xl font-bold ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
    TaskSchedly
    </NavLink>
    <div className='flex gap-8 items-center'>
    <NavLink to="/taskSchedly/TaskManagement"
              className={({ isActive }) =>
                `text-xl ${
                  isActive ? " py-1 text-gray-800 font-semibold" : "text-gray-400 hover:text-gray-700"
                }`}>Task Management </NavLink>
    <NavLink to="/taskSchedly/FinanceTracker"
              className={({ isActive }) =>
                `text-xl ${
                  isActive ? " py-1 text-gray-800 font-semibold" : "text-gray-400 hover:text-gray-700"
                }`}>Finance Tracker </NavLink>
    <NavLink to="/taskSchedly/Settings"
              className={({ isActive }) =>
                `text-xl ${
                  isActive ? "py-1 text-gray-800 font-semibold" : "text-gray-400 hover:text-gray-700"
                }`}>Settings </NavLink>
    </div>
    </div>
    </>
  )
}

export default Navbar