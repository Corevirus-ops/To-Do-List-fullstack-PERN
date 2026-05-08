import { useState, useEffect, Suspense, lazy} from "react";
// import TodoForm from "../components/todoPage/TodoForm";
// import TodoItems from "../components/todoPage/TodoItems";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";

const TodoForm = lazy(() => import("../components/todoPage/TodoForm"));
const TodoItems = lazy(() => import("../components/todoPage/TodoItems"));


export default function TodoPage({user, setUser}) {
const [todoItems, setTodoItems] = useState([]);
const [error, setError] = useState("");
const [logoutHint, setLogoutHint] = useState(false);

const navigate = useNavigate();

async function getTodos() {
  try {
    const res = await axios.get(`http://${import.meta.env.VITE_NETWORK}/todos`);
    if (res?.data?.err) { return setError(res?.data?.msg || "There was an issue with your request")}
    setTodoItems(res.data);
  } catch (e) {
    console.error(e);
  }
}

async function logOut() {
  try {
      const res = await axios.delete(`http://${import.meta.env.VITE_NETWORK}/api/logout`);
    if (res?.data?.err || res?.data?.loggedIn) { return setError(res?.data?.msg || "There was an issue with your request")}
    if (res?.status != 204) { return setError(res?.data?.msg || "There was an issue with logging out your account")}
    setUser({id: null});
    navigate('/login');
  } catch (err) {
    console.error(err);
  }
}

useEffect(() => {
if (user.id == null) {
  navigate('/login');
}
})
  
  useEffect(() => {
     getTodos();
  }, []);

  return (
    <>
<div className="flex flex-col gap-3 bg-gray-50 rounded-md shadow-gray-500 shadow-2xl items-center md:text-2xl lg:w-4/5 m-auto">
<section className="flex flex-col w-full items-end p-5 relative">
<button className="cursor-pointer text-gray-700 hover:text-gray-500 z-10" onMouseEnter={() => setLogoutHint(true)} onMouseLeave={() => setLogoutHint(false)} onClick={logOut} ><FaBackspace /></button>
{logoutHint && <p className="absolute bottom-0">Logout</p>}
</section>
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





