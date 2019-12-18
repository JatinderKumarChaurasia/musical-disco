import React, {useRef} from 'react';

interface NewTO {
    onAddTodo: (text:string)=>void;
}
const NewTodo:React.FC<NewTO> = (props)=>{
    const textInputRef = useRef<HTMLInputElement>(null);
    const todoSubmitHandler =(event:React.FormEvent)=>{
        event.preventDefault();
        const enteredText = textInputRef.current!.value;
        console.log(enteredText);
        props.onAddTodo(enteredText);
    }

  
    return <form onSubmit={todoSubmitHandler}>
        <div>
            <label htmlFor='label'>Label</label>
            <input type='text' id='label' placeholder='Enter Label' ref={textInputRef}/>
        </div>
        <input type='submit' value='Submit'/>
    </form>
};
export default NewTodo;