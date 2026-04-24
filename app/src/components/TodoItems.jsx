import { useState } from "react";
import axios from "axios";
import {FaPen, FaTrash, FaPlusSquare, FaBackspace, FaCheckCircle, FaRegCircle} from 'react-icons/fa';

export default function TodoItems({todoItems, setTodoItems}) {
    const [newText, setNewText] = useState('');
    const [editToDo, setEditToDo] = useState(null);

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodoItems((prev) => prev.filter(item => item.id !== id));
        } catch (err) { 
            console.error(err);
        }
    }

    async function handleComplete(item) {
        try {
            await axios.put(`http://localhost:5000/todos/${item.id}`, {description: item.description, completed: !item.completed})
            setTodoItems(todoItems.map((todo) => (todo.id == item.id ? 
                {...todo, completed: !todo.completed } : todo
            )))
        } catch (err) {
            console.error(err);
        }
    }

        async function handleUpdate(item) {
        try {
            await axios.put(`http://localhost:5000/todos/${item.id}`, {description: newText, completed: false})
            setTodoItems(todoItems.map((todo) => (todo.id == item.id ? 
                {...todo, completed: false, description: newText } : todo
            )));
            setNewText('');
            setEditToDo(null);
        } catch (err) {
            console.error(err);
        }
    }



    return (
        <div className="flex flex-col gap-10 p-5 overflow-auto w-3xl items-center text-2xl">
        {todoItems.length > 0 && todoItems.map((item) => 
                editToDo != item.id ?
            <div className="flex border-2 rounded-md border-gray-300 w-md p-1.5 shadow-gray-400 shadow-xs justify-between">
                <section className="flex gap-5">
                <button onClick={() => handleComplete(item)} className={`${item.completed && 'text-green-500'} cursor-pointer`} >{item.completed ? <FaCheckCircle/> : <FaRegCircle/>}</button>
                <span>{item.description}</span>
                </section>
                <div className="flex gap-5">
                    <button onClick={() => {setEditToDo(item.id); setNewText(item.description)}} className="cursor-pointer hover:text-gray-600"><FaPen/></button>
                    <button onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-emerald-50"><FaTrash/></button>
                </div>
            </div> 
            : 
            <div className="flex justify-evenly gap-1 border-2 rounded-md border-gray-400 w-md p-2 shadow-gray-400 shadow-xs">
                <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} className="focus:outline-none"/>
                <div className="flex gap-5 justify-between">
           <button onClick={() => handleUpdate(item)} className="text-green-600 cursor-pointer hover:text-green-500"><FaPlusSquare/></button>
           <button onClick={() => setEditToDo(null)} className="text-blue-600 scale-120 cursor-pointer hover:text-blue-500"><FaBackspace/></button>
                </div>
            </div>
        )
    }
        
        </div>
    )
}