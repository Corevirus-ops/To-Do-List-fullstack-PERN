
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import TodoPage from "./pages/TodoPage";
import NavBarMain from './components/navBar/NavBarMain';
import LoginPage from './pages/LoginPage';
import axios from 'axios';

axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState({id: null});

const navigate = useNavigate();
  async function getUser() {
    try {
      const res = await axios.get(`http://${import.meta.env.VITE_NETWORK}/api/user`);
      if (!res.data.loggedIn) {
        navigate('/login');
      } else {
        const {id, username} = res.data.user;
        setUser({id, username});
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);




  return (
     <div className="bg-blue-950 h-screen w-screen flex flex-col sm:overflow-auto justify-center">
      <NavBarMain />
      <Routes>
        <Route path="/todos" element={<TodoPage user={user} setUser={setUser} />} />
        <Route path="/" element={<h1>Loading...</h1>} />
        <Route path="/login" element={<LoginPage user={user} />} />
      </Routes>
     </div>
  )
}

export default App
