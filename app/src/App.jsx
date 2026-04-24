import TodoForm from "./components/TodoForm";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todoItems, setTodoItems] = useState([]);

async function getTodos() {
  try {
    const todos = await axios.get('http://localhost:5000/todos');
    setTodoItems(todos.data);
        alert(JSON.stringify(todos.data));

  } catch (e) {
    console.error(e);
  }
}
  
  useEffect(() => {
    getTodos();
  }, []);


  return (
    <>
     <div className="bg-blue-950 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-3 bg-gray-50 p-5 rounded-md shadow-gray-500 shadow-2xl min-w-2xl items-center">
          <h1 className="text-gray-600 text-6xl">My Todo List</h1>
              <TodoForm />
        </div>
     </div>
    </>
  )
}

export default App
