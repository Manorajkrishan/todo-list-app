import AddItems from "./AddItems";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useState,useEffect } from 'react';
import SerachItem from "./SerachItem";
import apiREQUEST from "./apiRequest";

function App() {

  const API_URL ='http://localhost:3500/items';

  const [search,setSearch]=useState('')
  const [fetchError,setFetchError]=useState(null)
  const [items,setItems]=useState([]);
  //meke mehema seane ekak tiyenwa dan mn mehtaa empty array ekak dunne nathnm app eka crase wenawa local stroage eke data nathnm eka wenuwata apita danna puluwan '||' operator dala emtyr array ekak danawa
  const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
      const fetchitems =async()=>{
        try{
          const response=await fetch(API_URL);
          if(!response.ok) throw Error("Data not recevied");
          const listItems = await response.json();
          console.log(listItems)
          setItems(listItems);
          setFetchError(null)
        }
        catch(err){
          setFetchError(err.message)
        }
        finally{
          setIsLoading(false)
        }
      
        
      }
      setTimeout(()=>{
        (async()=>await fetchitems())()

      })
      
    },[])

  const [NewItem,setNewItem]= useState('')

  const addItem=async (item)=>{
      const id=items.length? items[items.length-1].id +1 : 1;
      const addNewItem={id,checked:false,item}
      const listItems=[...items,addNewItem]
      setItems(listItems)
      //localStorage.setItem("todo_list",JSON.stringify(listItems))
      const postOptions={
        method :'POST',
        Headers :{
          'Content-Type' : 'application/json'

        },
        body : JSON.stringify(addNewItem)
      }
      const results =await apiREQUEST(API_URL,postOptions)
      if(results) setFetchError(results)
    }
  const handlecheck =async (id)=> {
        const listIems =items.map((item)=>item.id===id? {...item,checked:!item.checked
        } :item)  
    setItems(listIems) 
    //localStorage.setItem("todo_list",JSON.stringify(listIems))

    const myItem=listIems.filter((item)=>item.id===id)
    const updateOptions={
      method :'PATCH',
      Headers :{
        'Content-Type' : 'application/json'

      },
      body : JSON.stringify({checked : myItem[0].checked})
    }
    const reqUrl =`${API_URL}/${id}`
    const results =await apiREQUEST(reqUrl,updateOptions)
    if(results) setFetchError(results)
 }

  const deletestate=async(id)=>{
        const newItems=items.filter((item)=>
        item.id!==id)
        setItems(newItems)

        const deleteOptions={
          method:'DELETE'
        }
        //localStorage.setItem("todo_list",JSON.stringify(newItems))
        const reqUrl =`${API_URL}/${id}`
        const results =await apiREQUEST(reqUrl,deleteOptions)
        if(results) setFetchError(results)
    }

  const hadleSubmit=(e)=>{
      e.preventDefault()
      console.log(NewItem)
      addItem(NewItem)
      setNewItem('')
    }
  
  return (
    <div className="App">
      <Header title="krishan's to do list" />
      
      

      <AddItems
        NewItem={NewItem}
        setNewItem={setNewItem}
        handleSubmit={hadleSubmit}
      
      />
      <SerachItem
        search={search}
        setSearch={setSearch}
      />

      <main>
        {isLoading && <p>{`Loading items..`}</p>}
        {fetchError && <p>{`Error : ${fetchError}`}</p>}
      {!isLoading && ! fetchError && <Content
        
        items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
        
        deletestate={deletestate}
        handlecheck={handlecheck}

      />}
      </main>
      <Footer 
        length={items.length}
      
      />
        
    </div>
  );
}

export default App;
