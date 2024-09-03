import React from 'react';

function SecondaryButton({
    children,
    className = "",
    textSize = "text-lg",
    type = "button",
    ...props

}) {
    return (
        <button className={`'w-fit text-[#000] bg-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${textSize} font-semibold hover:bg-orange-500 transition-all ease-in duration-200 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default SecondaryButton;