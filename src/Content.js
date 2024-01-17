import React from 'react'

import ListItems from './ListItems'



const Content = ({items,handlecheck,deletestate}) => {
    

     
  return (
    <>
        {(items.length)?(

          <ListItems
          items={items}
        
        deletestate={deletestate}
        handlecheck={handlecheck}
        />


        ):(

            <p style={{
                marginTop:'2px'
            }}>Your list is empty</p>
        )
        }
    </>
  )
}

export default Content