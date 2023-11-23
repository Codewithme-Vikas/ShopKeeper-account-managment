import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

import Navbar from "../components/Navbar";

export default function HomePage() {

    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    console.log( userInfo , 'home page ')

   

    useEffect( ()=>{
        if (!userInfo) {
            navigate("/login");
        }
    },[]);

    return (
        <div>

            {/* Navbar */}
            <Navbar />

            <Outlet />
        </div>
    )
};