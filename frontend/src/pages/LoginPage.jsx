import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import {  Link, useNavigate } from "react-router-dom";

export default function LoginPage() {

    const { userInfo , setToken , setUserInfo } = useContext( UserContext );
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function loginHandler(e) {
        e.preventDefault();

        try {
            
            const response = await fetch("http://localhost:3000/api/v1/auth/login", {
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
        <>
            
        </>
    )
}