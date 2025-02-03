import React from 'react'

const AddTaskPlaceholder = ({onClickAddTask}) => {
  return (
    <div onClick={onClickAddTask}
        className='cursor-pointer w-48 h-48 rounded border-dotted border-2 border-spacing-2 border-gray-300 bg-gray-100 p-4 flex items-center justify-center'>
        <h3 className='text-base text-gray-500'>Add Task</h3>
    </div>
  )
}

export default AddTaskPlaceholder