import React from 'react'

function Button({
    children,
    className = "",
    bgColor = "bg-orange-400",
    textColor = "text-black",
    type = "button",
    ...props

}) {
    return (
        <button className={`w-fit px-3 py-1 rounded-md ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button