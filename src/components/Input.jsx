import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    type,
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div>
            <input 
            type={type}
            className={`bg-zinc-600 border-x-2 border-blue-700 font-bold text-xl p-2 text-center rounded-lg outline-none ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input