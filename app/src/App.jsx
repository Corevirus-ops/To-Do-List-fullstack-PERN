
 import TodoPage from "./pages/TodoPage";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


function App() {



  return (
    <Router>
     <div className="bg-blue-950 h-screen w-screen flex sm:overflow-auto justify-center">
      <Routes>
        <Route path="/" element={<TodoPage />} />
      </Routes>
     </div>
    </Router>
  )
}

export default App
