import React, {useId} from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {

    const id = useId()
  return (
    <div className='w-full'>
        {label && <label className='' htmlFor={id} ></label>}
        <select {...props} id={id} ref={ref} 
        className={` px-3 py-2 rounded-lg bg-transparent  text-black outline-none focus:border-orange-400  duration-200 border border-black w-full  ${className}`}>

            {options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}

        </select>
    </div>
  )
}

export default React.forwardRef(Select)