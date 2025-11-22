import React from 'react'

const SelectYear = () => {

    const current = new Date().getFullYear();
    const years = [current - 1, current, current + 1]; // 2024, 2025, 2026

    
    return (
        <div>
            <div>
                {years.map(y => (
                    <button key={y} >
                        {y}г.
                    </button>
                ))}
            </div>

           
        </div>

    )
}

export default SelectYear
