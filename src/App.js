import './App.css';
import { useState } from 'react';
function App() {

const [todo,setTodo] = useState([]);
const [inputValue,setInputValue] = useState("")

const getInputValue = (e) => {
  setInputValue(e.target.value)
}

const addItem = () => {
  setTodo([...todo,{val:inputValue}])
  let clearButton = document.getElementById('clear-btn')
  clearButton.style.display="inline"
}

const deleteItems = (index) => {
  setTodo(todo.filter((e,i)=>{
      return index !== i
  }))
}

const editItems = (index) => {
  setTodo(todo.map((e,i)=>{
    if(index==i){
      return {
        ...e,
        edit : e.edit?false : true
      }
      
    }
    else{
      return {
        ...e,
        edit : false
      }
    }
  }))
}

const item = todo.map((e,i)=>{
      
  return  <li key={i}><span id='span' > {e.edit? <input type="text" value={e.val} 
  onChange={(events) => {
    setTodo(todo.map((e,ind)=>{
      if(ind==i){
          return {
            ...e,
            val : events.target.value
          }
      }
      else{
        return e
      }
    }))
  }}  
  /> : e.val } </span>
  <div id='del-btn-div' >
 {!e.edit&&<button id='delete-btn' onClick={()=>{deleteItems(i)}}>Delete</button>}
  <button id='edit-btn' onClick={()=>{editItems(i)}}>{e.edit?'save':"Edit"}</button></div>
  </li>
})

const clearAll = () => {
  setTodo([]);
  let button =document.getElementById('clear-btn')
  button.style.display = "none"
}

  return (
    <div id="container">
      
      <div id='inner-div'>
        
        <div id='input-div'>
          <h1>TODO APP</h1>
          <div id='input-inner-div'>
              <input placeholder='Add Todo Here' onChange={getInputValue} type="text" id='input' />
            <button onClick={addItem} id='add-btn'>Add Items</button> 
            </div>
        
          <ul id='unorder-list'>
            {item}
          </ul>
          <span>You have pending {item.length} tasks</span>
          <button onClick={clearAll} id='clear-btn'>Clear All</button>
          </div>
        
        </div>     
     
    </div>
  );
}

export default App;
