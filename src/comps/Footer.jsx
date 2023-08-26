
import { Facebook, Twitter, LinkedIn, Instagram, Call } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from '../assets/logofinal.png';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";

function Footer() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    return (
        <>
            <div className="footer list-none px-[3vw] xl:px-[6vw]">
                <div className="menu grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-10">
                    <div className="logo p-5 flex flex-col justify-center items-center gap-10">
                        <div className="logo">
                            <Link to="/"><img src={Logo} className=" w-32"></img></Link>
                        </div>
                        <div className="social-icons flex text-[#315ED2] gap-5">
                            <li><a target="_blank" href="https://www.facebook.com/singhpublication" className='w-12 h-12 flex justify-center items-center rounded-[50%] border-2 border-blue-400'><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a target="_blank" href="https://www.instagram.com/singhpublication/" className='w-12 h-12 flex justify-center items-center rounded-[50%] border-2 border-blue-400'><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a target="_blank" href="https://www.linkedin.com/company/singh-publication/" className='w-12 h-12 flex justify-center items-center rounded-[50%] border-2 border-blue-400'><i className="fa-brands fa-linkedin-in"></i></a></li>
                            <li><a target="_blank" href="https://twitter.com/SinghPub_Jaipur" className='w-12 h-12 flex justify-center items-center rounded-[50%] border-2 border-blue-400'><i className="fa-brands fa-twitter"></i></a></li>
                        </div>
                    </div>
                    <div className="company py-3 sm:py-5 sm:mx-auto">
                        <h2 className='text-2xl font-bold'>Company</h2>
                        <div className="list mt-3 text-lg text-gray-500 grid gap-1">
                            <div className=" cursor-pointer" onClick={(e) => {
                                e.preventDefault();
                                navigate('/about');
                            }}><h2 className="">About Us</h2> </div>
                            <div className=" cursor-pointer"><h2 className="" onClick={(e) => {
                                e.preventDefault();
                                navigate('/careers');
                            }}>Careers</h2> </div>
                            <div className=" cursor-pointer" onClick={(e) => {
                                e.preventDefault();
                                navigate('/contact');
                            }}><h2 className="">Contact Us</h2> </div>
                        </div>
                    </div>
                    {/* <div className="explore py-10">
                        <h2 className='text-2xl font-bold'>Explore</h2>
                        <div className="list mt-5 text-lg text-gray-500 grid gap-1">
                            <li><a href="" className='py-2'>Resources</a></li>
                            <li><a href="" className='py-2'>Blog</a></li>
                            <li><a href="" className='py-2'>Documents</a></li>

                        </div>
                    </div> */}
                    <div className="Terms py-3 sm:py-5 sm:mx-auto">
                        <h2 className='text-2xl font-bold'>Terms Of Use</h2>
                        <div className="list mt-3 text-lg text-gray-500 grid gap-1">
                            <div onClick={(e) => {
                                e.preventDefault();
                                navigate('/t&c');
                            }} className=" cursor-pointer"><h2 className="">Terms & Conditions</h2> </div>
                            <div onClick={(e) => {
                                e.preventDefault();
                                navigate('/refund');
                            }} className=" cursor-pointer"><h2 className="">Return & Refund Policy</h2> </div>
                            <div onClick={(e) => {
                                e.preventDefault();
                                navigate('/privacypolicy');
                            }} className=" cursor-pointer"><h2 className="">Privacy Policy</h2> </div>
                            <div onClick={(e) => {
                                e.preventDefault();
                                navigate('/disclaimer');
                            }} className=" cursor-pointer"><h2 className="">Disclaimer</h2> </div>
                            <div onClick={(e) => {
                                e.preventDefault();
                                navigate('/faq');
                            }} className=" cursor-pointer"><h2 className="">FAQ's</h2> </div>

                        </div>
                    </div>

                </div>

            </div>
            <div className="copyright py-5 text-center text-white bg-[#315ED2] text-[0.75rem] sm:text-lg">Copyright © 2023 Singh Publication.in. All rights reserved.</div>

        </>
    );

}
export default Footer;