import { useState } from "react";
export default function TodoForm() {
    const [newTodo, setNewToDo] = useState('');

    return (
        <form>
            <input type="text" value={newTodo} onChange={(e) => setNewToDo(e.target.value)} placeholder="What do you plan to do?" />

        </form>
    )

}