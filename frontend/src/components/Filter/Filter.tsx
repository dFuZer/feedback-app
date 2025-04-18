import React, { useState } from 'react'

const data = [
    { id: 1, category: "a" },
    { id: 2, category: "b" },
    { id: 3, category: "c" },
]

function Filter() {

    const [filteredData, setFilteredData] = useState(data); 

    const handleCategoryClick = (category: string) => {

        if (category === '') {
            setFilteredData(data);
        } else {
            const newFilteredData = data.filter(item => item.category === category);
            setFilteredData(newFilteredData);
        }
    };

return (
    <div>
        <div className='blocButton'>
            <button onClick={() => handleCategoryClick('')}>Toutes les catégories</button>
            <button onClick={() => handleCategoryClick('a')}>Catégorie A</button>
            <button onClick={() => handleCategoryClick('b')}>Catégorie B</button>
            <button onClick={() => handleCategoryClick('c')}>Catégorie C</button>
        </div>

        <div>
        {filteredData.map(item => (
                    <div key={item.id}>
                        <p>Id: {item.id}, Catégorie: {item.category}</p>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default Filter