import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const { setToken , setUserInfo } = useContext( UserContext );
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState('Admin')

    async function loginHandler(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/v1/auth/login", {
                method: 'POST',
                body: JSON.stringify({ name, password, accountType }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials : 'include',
            })

            const data = await response.json();
            if( data.success ){
                const user = { name : data.userDoc.name, id : data.userDoc._id };
                setUserInfo( user );
                setToken( localStorage.getItem("token" ));
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
        <div className="mt-8 w-10/12 mx-auto">

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



                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="accountType">Type</label>
                    <select
                        name="accountType"
                        required
                        className="p-2 px-4 rounded text-black outline-none"
                        onChange={e => setAccountType(e.target.value)}
                        value={accountType}
                    >
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <button className="p-2 px-4 bg-red-600 rounded-lg">Login</button>
            </form>
        </div>
    )
}