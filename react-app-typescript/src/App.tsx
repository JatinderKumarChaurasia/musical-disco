import React,{useState} from 'react';
import TODOLIST from './components/TODOLIST';
import NewTodo from './components/NewTodo';

interface TODO{
  id:string;
  text:string;
}

const App: React.FC = () => {
  // const todos = [{id:1,text:'Hello'},{id:2,text:'Pink'}];
  const [todos,setodo] = useState<TODO[]>([]);
  const todoAddHandler = (text:string)=>{
    console.log(text);
    setodo(prevtodo=>[...prevtodo,{id:Math.random().toString(),text:text}])
  }

  const todoDeleteHandler = (todoId:string)=>{
        setodo(prevtodos=>{ return prevtodos.filter((prevtodo)=> prevtodo.id !== todoId)});
  }

  return (
    <div className="App">
      <TODOLIST items ={todos} onDeleteTodo={todoDeleteHandler}/>
      <NewTodo onAddTodo = {todoAddHandler} />
    </div>
  );
}

export default App;
