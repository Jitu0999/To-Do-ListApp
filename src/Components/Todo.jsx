import { useState } from 'react'
import'./CSS/Todo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import TodoItems from './TodoItems';

let count = 0;
const Todo = () => {

    const [todos,setTodos] = useState([]);
    const inptRef = useRef(null);

    const add = () => {
        setTodos([...todos,{no:count++,text:inptRef.current.value,display:""}]);
        inptRef.current.value = "";
        localStorage.setItem("todos_count",count)
    }

    useEffect(()=>{
      setTodos(JSON.parse(localStorage.getItem("todos")));
      count = localStorage.getItem("todos_count");
    },[])

    useEffect(()=>{
        
        setTimeout(()=> {
          console.log(todos);
          localStorage.setItem("todos",JSON.stringify(todos));
        }, 100);
    },[todos])

  return (
    <div className='todo'>
        <div className="todo-header"><u>To-Do List</u></div>
        <div className='todo-add'>
            <input ref={inptRef} type='text' placeholder='Add Your Task...' className='todo-input'/>
            <div onClick={()=>{add()}} className='todo-add-btn'>ADD</div>
        </div>
      <div div className="todo-list">
        {todos.map((item,index)=>{
          return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
        })}

      </div>
    </div>
  )
}

export default Todo
