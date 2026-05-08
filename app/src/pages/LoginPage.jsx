import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function LoginPage({user}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
const navigate = useNavigate();

useEffect(() => {
    if (user.id != null) {
        navigate('/todos')
    }

});

function handleEmail(e) {
if (e.target.value.length >= 100) return
setEmail(e.target.value.trim());
setError("");
}

function handlePassword(e) {
    if (e.target.value.length >= 100) return
setError("");
    setPassword(e.target.value.trim());
}

async function handleLogin(e) {
    e.preventDefault();
try {
    if (!email || !password) return;
    if (password.length < 6) {return setError('Password Needs To Be Longer') };
    const res = await axios.post(`http://${import.meta.env.VITE_NETWORK}/api/login`, {email, password}, {withCredentials: true});
    if (res.data.err) {
        setError(res.data.msg);
    }
    if (res.data.loggedIn) {
        window.location.href = `${import.meta.env.VITE_CLIENT_NETWORK}/todos`;
    } 

} catch (err) {
    console.error(err);
    setError('Something Went Wrong');
}
}

    return(
        <div className="flex justify-center items-center">
        <div className="bg-gray-100 border-4 border-blue-400 shadow-black shadow-2xl rounded-md sm:w-full sm:h-full lg:w-3/5 lg:h-9/12 flex flex-col gap-6 text-center text-2xl font-serif justify-around">
        <h1 className="text-6xl">Login</h1>
        {error && <h3 className="text-red-500">{error}</h3>}
        <form className="flex flex-col overflow-auto" onSubmit={handleLogin}>
            <section className="flex flex-col w-full gap-6 justify-center content-center">
            <FaUserCircle className="w-full text-8xl text-gray-800" />
                <label className="p-2">Email: <input type="email" className="outline-gray-400 outline-2 rounded-md p-2" placeholder="email@something.com" required value={email} onChange={handleEmail}/></label>
                <label className="p-2">Password: <input type={showPass ? "text" : "password"} placeholder="password123" className="outline-gray-400 outline-2 rounded-md p-2" required value={password} onChange={handlePassword} pattern="[^\s]+"/>
                    <input className="p-2 size-5.5 m-2 text-center" type="checkbox" checked={showPass} onChange={() => setShowPass(!showPass)} /></label>
            </section>
            <section className="text-xl flex w-full gap-2 justify-center p-6">
                <button className="cursor-pointer border-gray-400 rounded-md bg-gray-800 text-white border-2 p-4 hover:bg-gray-500" type="button" onClick={() => navigate('/new-account')}>Don't have an account?</button>
                <button className="cursor-pointer border-gray-400 rounded-md border-2 p-4 hover:bg-cyan-100" type="submit">Sign In</button>
            </section>
        </form>
            
        </div>

        </div>
    )
}