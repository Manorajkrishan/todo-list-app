import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItems = ({NewItem,setNewItem,handleSubmit}) => {
  const inputRef=useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addIterm"></label>
        <input 
        autoFocus
        ref={inputRef}
        type="text"
        id='addItem'
        placeholder='Add item'
        required
        value={NewItem}
        onChange={(e)=>setNewItem(e.target.value)}
         />
         <button
            type='submit'
            aria-label='Add item'
            onClick={()=>inputRef.current.focus()}
         
         >
            <FaPlus/>
         </button>
    </form>
  )
}

export default AddItems