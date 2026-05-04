import { useState, useEffect, Suspense, lazy} from "react";
// import TodoForm from "../components/todoPage/TodoForm";
// import TodoItems from "../components/todoPage/TodoItems";
import axios from "axios";

const TodoForm = lazy(() => import("../components/todoPage/TodoForm"));
const TodoItems = lazy(() => import("../components/todoPage/TodoItems"));


export default function TodoPage() {
const [todoItems, setTodoItems] = useState([]);
const [error, setError] = useState("");


async function getTodos() {
  try {
    const res = await axios.get(`http://${import.meta.env.VITE_NETWORK}/todos`);
    if (res.data.err) { return setError(res.data.msg || "There was an issue with your request")}
    setTodoItems(res.data);
  } catch (e) {
    console.error(e);
  }
}
  
  useEffect(() => {
     getTodos();
  }, []);

  return (
    <>
<div className="flex flex-col gap-3 bg-gray-50 rounded-md shadow-gray-500 shadow-2xl items-center sm:h-screen sm:w-screen md:text-2xl md:h-4/5 md:w-4/5 m-auto">
          <h1 className="text-gray-600 text-6xl p-2">My Todo List</h1>
          {error && <p className="text-red-500">{error}</p>}
          <Suspense fallback={<h1>Loading...</h1>}>
              <TodoForm setTodoItems={setTodoItems} setError={setError} />
              <TodoItems todoItems={todoItems} setTodoItems={setTodoItems} setError={setError} />
          </Suspense>
              </div>
    </>
  )


}





