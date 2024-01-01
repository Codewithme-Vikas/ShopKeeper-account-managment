import { useState } from "react"
import { resetPasswordToken } from "../services/operations/auth";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordToken() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSent, setIsSentEmail] = useState(false);

    // send email
    async function submitHandler(e) {
        e.preventDefault();
        await resetPasswordToken(email, setIsSentEmail);
    };


    return (
        <>

            {isSent ? (
                <div className="my-20 ml-20">
                    <p className="text-xl">Check you mail box</p>
                    <p>The link is sent to you email id {email} for reset the password</p>
                    <button onClick={() => setIsSentEmail(false)} className="p-2 px-4 bg-blue-600 rounded-lg my-2">Go Back</button>
                </div>
            ) : (
                <form onSubmit={submitHandler} className="flex flex-col mx-auto max-w-xl gap-4 mt-6  items-start border rounded p-4 py-8">

                    <div className="">
                        <h2 className="mb-2 text-center text-xl text-blue-500">Forget Password?</h2>
                        <p>Don't worry , we will send a email to reset password.</p>
                        <p>Please enter you registered email id.</p>
                        <p className="text-red-400">Please wait for few second after click the send email!</p>
                    </div>

                    <div className="flex gap-2 items-center justify-center w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="text-black p-2 rounded outline-none w-full"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="p-2 px-4 bg-blue-600 rounded-lg hover:bg-blue-700 ">
                            Go back
                        </button>
                        <button className="p-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-800 ">Send email</button>
                    </div>
                </form>
            )}

        </>
    )
};