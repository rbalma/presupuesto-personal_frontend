import React from 'react'

export default function List() {

    const fetchOperations = () => {
        fetch('/')
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div>
            
        </div>
    )
}
