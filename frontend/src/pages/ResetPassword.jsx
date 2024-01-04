import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operations/auth";

export default function ResetPassword() {

    const navigate = useNavigate();
    const { id , token } = useParams();
    console.log( id , token )
    const [ password , setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");

    async function submitHandler(e) {
        e.preventDefault();
       await resetPassword( id , token , password , confirmPassword, navigate );
    }

    return (
        <>
            <form onSubmit={submitHandler} className="max-w-3xl mx-auto flex flex-col gap-4 mt-6 items-start border rounded p-4 py-8">

                <h2 className="text-xl text-center">Reset Your Password</h2>
                
                <div className="flex gap-2 items-center justify-center">
                    <label htmlFor="password">password</label>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="text-black p-2 rounded outline-none"
                    />
                </div>

                <button className="p-2 px-4 bg-red-600 rounded-lg">Reset</button>
            </form>
        </>
    )
}