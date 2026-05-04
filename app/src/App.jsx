
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import TodoPage from "./pages/TodoPage";
import NavBarMain from './components/navBar/NavBarMain';
import LoginPage from './pages/LoginPage';
import axios from 'axios';

axios.defaults.withCredentials = true;
function App() {



  return (
    <Router>
     <div className="bg-blue-950 h-screen w-screen flex flex-col sm:overflow-auto justify-center">
      <NavBarMain />
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
     </div>
    </Router>
  )
}

export default App
