import React from 'react';

interface TODOLISTPROPS {
    items:{
        id:string,
        text:string
    }[];
    onDeleteTodo:(id:string)=>void;
    
}
const TODOLIST: React.FC<TODOLISTPROPS> = (props) => {
    return <ul>
        {props.items.map((todo)=>(<li key={todo.id}><span>{todo.text}</span><button onClick={props.onDeleteTodo.bind(null,todo.id)}>Delete</button></li>))}
    </ul>;
}
export default TODOLIST;