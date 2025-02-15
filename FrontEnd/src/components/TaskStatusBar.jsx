import React, { useState } from 'react'

const TaskStatusBar = ({setCurrentStatus,currentStatus,tasknotification}) => {

  return (
    <>
    <div className='shadow-md shadow-white-800 w-full py-4 md:w-28 relative'>
        <div className='flex fixed flex-row justify-end top-20 md:flex-col items-start w-full left-0 gap-5 px-2'>
            {["all","completed","active","pending"].map((status) => (
              <div key={status} className='flex gap-1'>
                <button 
                className={` font-semibold ${currentStatus===status ?"text-gray-800" : "text-gray-400 hover:text-gray-700"}`}
                onClick={() => setCurrentStatus(status)}>
                    {status.charAt(0).toUpperCase()+status.slice(1)}
                </button>
                {currentStatus===status && <p className='flex justify-center items-center bg-black text-xs text-white rounded-full p-2 w-4 h-4'>{tasknotification}</p>}
              </div>
            ))}
            
        </div>
    </div>
    </>
  )
}

export default TaskStatusBar