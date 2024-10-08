import React, { useId } from 'react'

const Inputbox = React.forwardRef(function Inputbox({
  label,
  labelbg = "bg-white",
  labelTextCol = "text-black",
  type = "text",
  className = "",
  ...props

}, ref) {

  const id = useId()

  return (
    <div className='w-full flex relative flex-col gap-3'>

      {label && <label className={`w-fit absolute -top-3 left-3 ${labelbg} ${labelTextCol} px-3 py-1 text-sm font-semibold rounded-lg  inline-block mb-1`} htmlFor={id}>{label}</label>}

      <input type={type} className={`px-3 py-7 rounded-lg bg-transparent placeholder:text-orange-300 text-black outline-none focus:border-orange-400  duration-200 border border-black w-full ${className}`}
        ref={ref} id={id}
        {...props} />

    </div>
  )
})


export default Inputbox