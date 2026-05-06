import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [conEmail, setConEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [showPassword, setShowPassword] = useState({1: false, 2: false});

    const navigate = useNavigate();
    
    return (
        <div className="w-full h-full flex">
            <div className="flex flex-col gap-6 bg-cyan-50 m-auto p-5 rounded-md border-black border-2">
                <h1 className="text-6xl">Sign Up</h1>
                <form className="flex flex-col gap-4 p-5" >
                    <label className="w-full flex gap-1.5 justify-between">Name: <input type="text" value={name} onChange={(e) => setName(e)} className="outline-2 outline-gray-500 bg-gray-50 rounded-md" /> </label>
                    <label className="w-full flex gap-1.5 justify-between">Email: <input type="email" value={email} onChange={(e) => setEmail(e)} className="outline-2 outline-gray-500 bg-gray-50 rounded-md" /> </label>
                    <label className="w-full flex gap-1.5 justify-between">Confirm Email: <input type="email" value={conEmail} onChange={(e) => setConEmail(e)} className="outline-2 outline-gray-500 bg-gray-50 rounded-md" /> </label>
                    <label className="w-full flex gap-1.5 justify-between">Password: <input type="password" value={password} onChange={(e) => setPassword(e)} className="outline-2 outline-gray-500 bg-gray-50 rounded-md" /> </label>
                    <label className="w-full flex gap-1.5 justify-between">Confirm Password: <input type="password" value={name} onChange={(e) => setConPassword(e)} className="outline-2 outline-gray-500 bg-gray-50 rounded-md" /> </label>
                </form>

            </div>
        </div>
    )
}