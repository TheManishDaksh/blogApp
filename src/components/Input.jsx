import { useId } from "react"
import React from 'react'

const Input = React.forwardRef(({
    label,
    type = "text",
    className = "",
    ...props
},ref)=>{
    const Id = useId();
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1" htmlFor={Id}>
                    {label}
                </label>}
                <input className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                type={type} id={Id}
                ref={ref}
                {...props}
                />
        </div>
    )
})


export default Input