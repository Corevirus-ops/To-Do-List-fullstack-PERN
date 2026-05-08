import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignUp({user}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [conEmail, setConEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [showPass, setShowPass] = useState({pass: false, passCon: false});
    const [error, setError] = useState("");

    const navigate = useNavigate();

useEffect(() => {
    if (user.id != null) {
        navigate('/todos')
    }

});

    function handleName(e) {
        const val = e.target.value;
        if (val.length > 50) return;
        setError("");
        setName(val);
    }

        function handleEmail(e) {
        const val = e.target.value;
        if (val.length > 50) return;
        setError("");
        setEmail(val);
    }

        function handleConEmail(e) {
        const val = e.target.value;
        if (val.length > 50) return;
        setError("");
        setConEmail(val);
    }

    function handlePassword(e) {
        const val = e.target.value;
        if (val.length > 50) return;
        setError("");
        setPassword(val);
    }

        function handleConPassword(e) {
        const val = e.target.value;
        if (val.length > 50) return;
        setError("");
        setConPassword(val);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!name || !email || !conEmail || !password || !conPassword) {return setError("All Fields Are Required")}
            if (email != conEmail) {return setError("Emails Do Not Match")}
            if (password != conPassword) {return setError("Passwords Do Not Match")}
            if (password.length < 6) {return setError("Password Needs to be atleast 6 characters")}

             const res = await axios.post(`http://${import.meta.env.VITE_NETWORK}/api/new-account`, {name, email, password});
             if (res.data.err) {return setError(res.data.msg || "Something Went Wrong")}
             if (res.status != 201 || !res.data.loggedIn) {return setError(res.data.msg || "Something Went Wrong")}
             if (res.data.loggedIn) {
                 window.location.href = `${import.meta.env.VITE_CLIENT_NETWORK}/todos`;
             }

        } catch (err) {
            console.error(err);
        setError("Something Went Wrong!")
        }
    }
    
    return (
        <div className="flex justify-center items-center">
        <div className="bg-gray-100 border-4 border-blue-400 shadow-black shadow-2xl rounded-md lg:w-3/5 lg:h-9/12 flex flex-col gap-6 text-center md:text-2xl font-serif">
        <h1 className="text-6xl">Sign Up</h1>
        {error && <h3 className="text-red-500">{error}</h3>}
        <form className="flex flex-col overflow-auto" onSubmit={handleSubmit} >
            <section className="flex flex-col w-full gap-6 justify-center content-center items-center">
                <label className="p-2 flex justify-between lg:w-1/2">Name: <input type="text" spellCheck={false} className="outline-gray-400 outline-2 rounded-md p-2" placeholder="John Smith" value={name} onChange={handleName} required/></label>
                <label className="p-2 flex justify-between lg:w-1/2">Email: <input type="email" spellCheck={false} className="outline-gray-400 outline-2 rounded-md p-2" placeholder="email@something.com" value={email} onChange={handleEmail} required /></label>
                <label className="p-2 flex justify-between lg:w-1/2">Confirm Email: <input type="email" spellCheck={false} className="outline-gray-400 outline-2 rounded-md p-2" placeholder="email@something.com" value={conEmail} onChange={handleConEmail} required/></label>
                <label className="p-2 flex justify-between lg:w-1/2">Password: <div className="flex gap-2 m-2"><input spellCheck={false} type={showPass?.pass ? "text" : "password"} placeholder="password123" className="outline-gray-400 outline-2 rounded-md p-2" required value={password} onChange={handlePassword} pattern="[^\s]+"/>
                    <input className="p-2 size-5.5 m-2 text-center" type="checkbox" checked={showPass.pass} onChange={() => setShowPass(prev => ({...prev, pass: !showPass.pass }))}  /></div></label>
                <label className="p-2 flex justify-between lg:w-1/2">Confirm Password:<div className="flex gap-2 m-2"> <input spellCheck={false} type={showPass.passCon ? "text" : "password"} placeholder="password123" className="outline-gray-400 outline-2 rounded-md p-2" required value={conPassword} onChange={handleConPassword}  pattern="[^\s]+"/>
                    <input className="p-2 size-5.5 m-2 text-center" type="checkbox" checked={showPass.passCon} onChange={() => setShowPass(prev => ({...prev, passCon: !showPass.passCon }))}  /></div></label>
            </section>
            <section className="text-xl flex w-full gap-2 justify-center p-6">
                <button className="cursor-pointer border-gray-400 rounded-md bg-gray-800 text-white border-2 p-4 hover:bg-gray-500" type="button" onClick={() => navigate('/login')}>Have An Account Already?</button>
                <button className="cursor-pointer border-gray-400 rounded-md border-2 p-4 hover:bg-cyan-100" type="submit">Sign Up</button>
            </section>
        </form>
            
        </div>

        </div>
    )
}