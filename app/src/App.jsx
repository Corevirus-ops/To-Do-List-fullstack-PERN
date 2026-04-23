import TodoForm from "./components/TodoForm";

function App() {


  return (
    <>
     <div className="bg-blue-950 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-1.5 bg-gray-50 p-5 rounded-md shadow-gray-500 shadow-2xl min-w-3xl min-h-4/12">
          <h1 className="text-gray-600 text-6xl p-2">My Todo List</h1>
            <div className="flex">
              <TodoForm />
            </div>
        </div>
     </div>
    </>
  )
}

export default App
