import { useState } from "react";
import axios from "axios";
import {FaPen, FaTrash} from 'react-icons/fa';

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

    return (
        <div className="flex w-fit flex-col gap-5">
        {todoItems.length > 0 && todoItems.map((item, index) => 
            <div className="flex border-2 rounded-md border-gray-300 w-sm p-1 shadow-gray-400 shadow-xs justify-between">
                <span>{item.description}</span>
                <div className="flex gap-5">
                    <button className="cursor-pointer hover:text-gray-600"><FaPen/></button>
                    <button onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-emerald-50"><FaTrash/></button>
                </div>
            </div>
        )
    }
        
        </div>
    )
}