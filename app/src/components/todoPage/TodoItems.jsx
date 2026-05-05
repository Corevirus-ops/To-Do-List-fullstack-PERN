import { useState} from "react";
import axios from "axios";
import {FaCheckCircle, FaRegCircle} from 'react-icons/fa';
import TodoItemCard from "./TodoItemCard";

export default function TodoItems({todoItems, setTodoItems, setError}) {
    const [newText, setNewText] = useState('');
    const [editToDo, setEditToDo] = useState(null);
    const [filtered, setFiltered] = useState("");

    async function handleDelete(id) {
        try {
           const res = await axios.delete(`http://${import.meta.env.VITE_NETWORK}/todos/${id}`);
           if (res.data.err) { return setError(res.data.msg || "There was an issue with your request")}
            setTodoItems((prev) => prev.filter(item => item.id != id));
            setError("");
        } catch (err) { 
            console.error(err);
        }
    }

    async function handleComplete(item) {
        try {
            const res = await axios.put(`http://${import.meta.env.VITE_NETWORK}/todos/${item.id}`, {description: item.description, completed: !item.completed});
            if (res.data.err) { return setError(res.data.msg || "There was an issue with your request")}
            setTodoItems(todoItems.map((todo) => (todo.id == item.id ? 
                {...todo, completed: !todo.completed } : todo)));
            setError("");
        } catch (err) {
            console.error(err);
        }
    }

        async function handleUpdate(item) {

        try {
            const res = await axios.put(`http://${import.meta.env.VITE_NETWORK}/todos/${item.id}`, {description: newText, completed: false});
            if (res.data.err) { return setError(res.data.msg || "There was an issue with your request")}
            setTodoItems(todoItems.map((todo) => (todo.id == item.id ? 
                {...todo, completed: false, description: newText } : todo)));
            setNewText('');
            setEditToDo(null);
            setError("");
        } catch (err) {
            console.error(err);
        }
    }





    return (
        <>
     <section className="flex gap-2 w-full justify-evenly m-5">
        <button className="cursor-pointer" onClick={() => setFiltered("")} >{!filtered ? <FaCheckCircle className="text-green-500"/> : <FaRegCircle/>} No Filter</button>
        <button className="cursor-pointer" onClick={() => setFiltered("completed")}>{filtered == "completed" ? <FaCheckCircle className="text-green-500"/> : <FaRegCircle/>} Completed</button>
        <button className="cursor-pointer" onClick={() => setFiltered("todo")}>{filtered == "todo" ? <FaCheckCircle className="text-green-500"/> : <FaRegCircle/>} Left To Do</button>
        
        </section>   
        <div className="flex flex-col gap-10 p-5 overflow-auto items-center w-11/12">
        {todoItems.length > 0 && todoItems?.map((item, index) => {
            const ItemCard = <TodoItemCard key={index} setEditToDo={setEditToDo} handleDelete={handleDelete} setNewText={setNewText} item={item} handleComplete={handleComplete} handleUpdate={handleUpdate} editToDo={editToDo} newText={newText} />
                if (!filtered) return ItemCard  
                if (filtered == "completed" && item.completed) return ItemCard 
                if (filtered == "todo" && !item.completed) return ItemCard  

        }

        )
    }
        </div>
        
        </>
    )
}