import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { UserContext } from "../context/userContext"
import { navLinks } from "../data/navLinks"

import { logout } from "../services/operations/auth"
import logo from "../assets/image/logo.png"

export default function Navbar() {

    const navigate = useNavigate();
    const { setUserInfo, setToken } = useContext(UserContext);


    return (
        <div className="bg-slate-800 sticky top-0">

            <div className="w-10/12 mx-auto py-3 flex justify-between items-center gap-2">

                {/* website logo */}
                <div className="text-xl">
                    <img src={logo} className="w-[90px]"/>
                </div>



                {/* Nav links */}
                <div className="flex items-center gap-10 justify-center w-full">

                    {
                        navLinks.map((link, index) => {
                            return (

                                link.path ? 
                                (
                                    <Link key={index} to={link.path}>{link.title}</Link>
                                ) : (
                                    <button key={index}
                                        
                                    onClick={() => link.title === "Logout" && logout(setUserInfo, setToken, navigate)}
                                    
                                        className="ms-5"
                                    >
                                        {link.title}
                                    </button>
                                )

                            )
                        })
                    }


                </div>


            </div>

        </div>
    )
};