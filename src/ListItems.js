import React from 'react'

import LineItems from './LineItems';

const ListItems = ({items,deletestate,handlecheck}) => {
  return (
    <ul>
    {items.map((item)=>(

        <LineItems
        item={item}
        key={item.id}
        deletestate={deletestate}
        handlecheck={handlecheck}
        
        />
    
    ))}
</ul>
  )
}

export default ListItems