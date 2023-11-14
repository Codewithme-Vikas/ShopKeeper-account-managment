import { Link } from "react-router-dom"
import { navLinks } from "../data/navLinks"


export default function Navbar() {


    return (
        <div className="bg-slate-800">

            <div className="w-10/12 mx-auto py-3 flex justify-between items-center gap-2">

                {/* website logo */}
                <div className="text-xl">
                    {/* <image src/> */}
                    Monitor
                </div>



                {/* Nav links */}
                <div className="flex items-center gap-10 justify-center w-full">

                    {
                        navLinks.map((link, index) => {
                            return (
                                <Link key={index} to={link.path}>{link.title}</Link>
                            )
                        })
                    }


                </div>


            </div>

        </div>
    )
};