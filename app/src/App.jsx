import TodoForm from "./components/TodoForm";
import TodoItems from "./components/TodoItems";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todoItems, setTodoItems] = useState([]);

async function getTodos() {
  try {
    const todos = await axios.get(`http://${import.meta.env.VITE_NETWORK}/todos`);
    setTodoItems(todos.data);
  } catch (e) {
    console.error(e);
  }
}
  
  useEffect(() => {
    getTodos();
  }, []);


  return (
    <>
     <div className="bg-blue-950 h-screen w-screen flex sm:overflow-auto justify-center">
        <div className="flex flex-col gap-3 bg-gray-50 rounded-md shadow-gray-500 shadow-2xl items-center sm:h-screen sm:w-screen md:text-2xl md:h-4/5 md:w-4/5 m-auto">
          <h1 className="text-gray-600 text-6xl p-2">My Todo List</h1>
              <TodoForm setTodoItems={setTodoItems} />
              <TodoItems todoItems={todoItems} setTodoItems={setTodoItems}/>
        </div>
     </div>
    </>
  )
}

export default App
