import Login from "../components/Login";
import Carousel from "../components/Crousel";

// images
import logo from "../assets/image/logo.png"
import Board from "../assets/image/3dBoard.png"
import backLight from "../assets/image/backLight.png"
import billBook from "../assets/image/billBook.png"
import canopy from "../assets/image/canopy.png"
import digitMarketing from "../assets/image/digitMarketing.png"
import hodingFlex from "../assets/image/hodingFlex.png"
import oneWay from "../assets/image/oneWay.png"
import standy from "../assets/image/standy.png"
import stickers from "../assets/image/stickers.png"
import tShirt from "../assets/image/tShirt.png"
import pamplet from "../assets/image/pamplet.png"
import laterHead from "../assets/image/laterHead.png"
import garmentsTag from "../assets/image/garmentsTag.png"
import envelopes from "../assets/image/envelopes.png"
import visitingCard from "../assets/image/visitingCard.png"
import wallPaper from "../assets/image/wallPaper.png"


import canonPrinter from '../assets/canonPrinter.jpg'
import ecoMachine from '../assets/ecoMachine.jpg'
import flexMachine from '../assets/flexMachine.jpeg'

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
                        <img src={hodingFlex} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={stickers} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={envelopes} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={standy} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={Board} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={laterHead} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={billBook} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={canopy} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={pamplet} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={visitingCard} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={backLight} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded hover:scale-[1.1] duration-75">
                        <img src={tShirt} alt="" className="w-[300px]" />
                    </div>

                    {/* <div className="p-2 shadow-md shadow-white rounded ">
                        <img src={oneWay} alt="" className="w-[300px]" />
                    </div>

                    <div className="p-2 shadow-md shadow-white rounded ">
                        <img src={wallPaper} alt="" className="w-[300px]" />
                    </div> */}

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