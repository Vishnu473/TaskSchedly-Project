import 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className='px-10 bg-white text-gray-900 flex h-16 items-center justify-between shadow-md shadow-white-900'>
    <NavLink to="/taskSchedly"
    className={({isActive}) => `text-3xl font-bold ${isActive ? 'text-blue-600' : 'text-black'}`}>
    TaskSchedly
    </NavLink>
    <div className='flex gap-8 items-center'>
    <NavLink to="/taskSchedly/TaskManagement"
              className={({ isActive }) =>
                `text-xl ${
                  isActive ? " py-1 text-blue-600 font-semibold" : "text-gray-900 hover:text-blue-700"
                }`}>Task Management </NavLink>
    <NavLink to="/taskSchedly/FinanceTracker"
              className={({ isActive }) =>
                `text-xl ${
                  isActive ? " py-1 text-blue-600 font-semibold" : "text-gray-900 hover:text-blue-700"
                }`}>Finance Tracker </NavLink>
    <NavLink to="/taskSchedly/Settings"
              className={({ isActive }) =>
                `text-xl ${
                  isActive ? "py-1 text-blue-600 font-semibold" : "text-gray-900 hover:text-blue-700"
                }`}>Settings </NavLink>
    </div>
    </div>
    </>
  )
}

export default Navbar