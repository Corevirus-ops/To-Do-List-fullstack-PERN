import { useState } from "react";
import {IoMdAddCircleOutline} from 'react-icons/io';
import axios from "axios";
export default function TodoForm({setTodoItems}) {
    const [newTodo, setNewToDo] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (newTodo.trim().length < 1) return;
        try {
            const newItem = await axios.post(`http://${import.meta.env.VITE_NETWORK}/todos`, {description: newTodo, completed: false});
            setNewToDo('');
            setTodoItems((prev) => [...prev, newItem.data]);
        } catch (err) {
            console.error(err);
        }
    }
    

    return (
        <div className="flex p-2 w-s">
        <form className="flex p-2 border-2 border-gray-300 rounded-xl shadow-xs shadow-gray-400 justify-evenly" onSubmit={handleSubmit}>
            <input className="flex focus-within:outline-none" type="text" value={newTodo} onChange={(e) => setNewToDo(e.target.value)} placeholder="What do you plan to do?" />
            <button type="submit" className="cursor-pointer hover:text-blue-500"><IoMdAddCircleOutline/></button>
        </form>
        </div>
    )

}