import React from 'react';

function Button({
    children,
    className = "",
    type = "button",
    ...props

}) {
    return (
        <button className={`'w-fit text-[#fff] bg-black py-2 px-4 rounded-lg flex items-center justify-center text-sm font-semibold hover:text-orange-500 transition-all ease-in duration-200 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;