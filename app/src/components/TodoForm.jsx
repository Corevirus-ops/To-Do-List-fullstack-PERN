import { useState } from "react";
import {IoMdAddCircleOutline} from 'react-icons/io'
export default function TodoForm() {
    const [newTodo, setNewToDo] = useState('');

    return (
        <div className="flex pt-2">
        <form className="flex p-2 border-2 border-gray-300 rounded-xl shadow-xs shadow-gray-400 justify-evenly">
            <input className="flex focus-within:outline-none" type="text" value={newTodo} onChange={(e) => setNewToDo(e.target.value)} placeholder="What do you plan to do?" />
            <button className="cursor-pointer hover:text-blue-500 text-2xl"><IoMdAddCircleOutline/></button>
        </form>
        </div>
    )

}