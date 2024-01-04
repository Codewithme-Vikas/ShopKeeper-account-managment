import Login from "../components/Login";
import Carousel from "../components/Crousel";

// images
import logo from "../assets/image/logo.png"

import canonPrinter from '../assets/crouselmage/canonPrinter.jpg'
import ecoMachine from '../assets/crouselmage/ecoMachine.jpg'
import flexMachine from '../assets/crouselmage/flexMachine.jpeg'

export default function LandingPage() {




    return (

        <>
            <header className="bg-slate-300 py-2 sticky top-0">
                <div className="w-10/12 mx-auto flex  items-center justify-between">
                    <div>
                        <a className="text-lg font-semibold">
                            <img src={logo} alt="Logo" className="w-[90px]" />
                        </a>
                    </div>
                    <nav className="hidden sm:block">
                        <ul className="flex items-center justify-center gap-5">
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            {/* <li>
                                <a href="#about">About us</a>
                            </li> */}
                            <li>
                                <a href="#footer">Contact us</a>
                            </li>
                            <li>
                                <a href="#services">Services</a>
                            </li>
                            <li>
                                <a href="#login">Login</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>


            <section id="home" className="w-full mb-2">

                <Carousel
                    img1={canonPrinter}
                    img2={ecoMachine}
                    img3={flexMachine}
                />
            </section>


            {/* <section id="about" className="w-10/12 mx-auto py-4">
                About section
                <p>We hae experince of 50years.</p>
            </section> */}


            <section id="services" className="w-10/12 mx-auto">
                <h1 className="text-center text-2xl my-3">Our Services</h1>

                <div className="flex justify-between gap-6 flex-wrap ">

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359384/Shopkeeper%20account%20managment/hodingFlex-d1c863d1_aihnx1.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359395/Shopkeeper%20account%20managment/stickers-f1c72e75_h8nt10.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359394/Shopkeeper%20account%20managment/envelopes-7a0199c5_qyaezn.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359377/Shopkeeper%20account%20managment/standy-201b66ef_j5imuj.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359390/Shopkeeper%20account%20managment/3dBoard-1528a010_vg34to.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359419/Shopkeeper%20account%20managment/laterHead-74d8d13e_xlyp28.png"     alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359371/Shopkeeper%20account%20managment/billBook-94423608_p9rb3b.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359396/Shopkeeper%20account%20managment/canopy-25ec1517_sziimr.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359376/Shopkeeper%20account%20managment/pamplet-1d28ad67_nnkb99.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359389/Shopkeeper%20account%20managment/visitingCard-b6b38756_mutaxy.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359390/Shopkeeper%20account%20managment/backLight-e844fd1e_yei077.png" alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src="https://res.cloudinary.com/dqzctmgsp/image/upload/v1704359376/Shopkeeper%20account%20managment/tShirt-729c4c96_th7lph.png" alt="" className="w-[300px]" />
                    </div>


                </div>


            </section>

            <section id="login" className="w-10/12 mx-auto my-4">

                <Login />

            </section>




            <footer id="footer" className="bg-slate-300 p-4 py-4 text-center gap-2 text-sm">

                <div className="flex gap-12 justify-around">


                    <div className="flex flex-col gap-4">

                        <div className="border-b-2 border-white">
                            <h2 className="text-2xl">Ritik Advertising</h2>
                        </div>

                        <div className="flex flex-col gap-1 border-b-2 border-white" >
                            <p className="text-lg">Address :</p>
                            <p>Silarpur Road,</p>
                            <p>Dankaur Dist - G.B. Nagar,</p>
                            <p>Uttar Pradesh</p>
                        </div>

                        <div className="flex flex-col text-lg border-b-2 border-white">
                            <p>+91 7755155020</p>
                            <p>+91 9412845464</p>
                            <p>yadav.ritik@gmail.com</p>
                        </div>
                    </div>


                    <div className="middle flex flex-col gap-4 flex-start">

                        <h2 className="text-lg">Menu</h2>

                        <ul className="flex flex-col gap-1">
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            {/* <li>
                                <a href="#about">About</a>
                            </li> */}
                            <li>
                                <a href="#services">Services</a>
                            </li>
                            <li>
                                <a href="#contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>



                    <div className="right flex flex-col gap-4 flex-start">

                        <h2 className="text-lg">Category</h2>

                        <ul className="flex flex-col gap-1">
                            <li>
                                Category-1
                            </li>
                            <li>
                                Category-2
                            </li>
                            <li>
                                Category-3
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-sm mt-2"> copyright reserved <span className="font-bold">&copy;</span>  by <span className="font-semibold">Rititk advertising</span>
                    and Desgined by
                    <a href="mailto:vikashnagar2025@gmail.com" className="curosor-pointer font-semibold pl-1">

                        {/* <i>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FF0000" viewBox="0 0 24 24" width="18" height="18" className="inline">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </i> */}
                        <span className="pl-1">Vikas Tech</span>


                    </a>
                </p>

            </footer>

        </>
    )
}