import React from 'react'


export default function Container({ children, className }) {
    return (
        <div className={`max-w[1200px] mx-auto ${className}`}>{children}</div>
    )
}
