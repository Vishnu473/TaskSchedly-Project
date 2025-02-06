import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const TaskStatusBar = ({setCurrentStatus,currentStatus}) => {

  return (
    <>
    <div className='shadow-md shadow-white-800 w-28 px-4 py-4 relative'>
        <div className='flex flex-col items-start gap-5 fixed left-0  px-2'>
            {["all","completed","active","pending"].map((status) => (
                <button key={status}
                className={` font-semibold ${currentStatus===status ?"text-gray-800" : "text-gray-400 hover:text-gray-700"}`}
                onClick={() => setCurrentStatus(status)}>
                    {status.charAt(0).toUpperCase()+status.slice(1)}
                </button>
            ))}
        </div>
    </div>
    </>
  )
}

export default TaskStatusBar