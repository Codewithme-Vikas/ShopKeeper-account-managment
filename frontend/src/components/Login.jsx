import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import {  Link, useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../data/backendUrl";

export default function Login() {

    const {  setToken , setUserInfo } = useContext( UserContext );
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function loginHandler(e) {
        e.preventDefault();

        try {
            
            const response = await fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ name, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials : 'include',
            })

            const data = await response.json();
            if( data.success ){
                const user = { name : data.userDoc.name, id : data.userDoc._id , accountType : data.userDoc.accountType };
                setUserInfo( user );
                
                localStorage.setItem("token", JSON.stringify(data?.token));
                localStorage.setItem("user", JSON.stringify(user));
                
                setToken( localStorage.getItem("token") );

                toast.success("Successfully login.")
                return navigate("/");
            }else{
                console.log( data.message );
                setUserInfo( null );
                setToken( null )
                toast.error("Failed to login!");
                return false;
            }
        } catch (error) {
            console.error(error, "Error in login handler");
            return null;
        }
    }

    return (
        <div className="mt-8 mx-auto">

            <h1 className="text-2xl text-center ">Login, Please...</h1>

            <form onSubmit={loginHandler} className="flex flex-col gap-4 mt-6 items-start border rounded p-4 py-8">

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="text-black p-2 rounded outline-none"
                    />
                </div>

                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="text-black p-2 rounded outline-none"
                    />
                </div>

                <Link to={"/reset-password"} className="text-blue-700 text-sm">Forget Password?</Link>
                <button className="p-2 px-4 bg-red-600 text-white rounded-lg">Login</button>
            </form>
        </div>
    )
}