import React, { useEffect } from "react";
import Logo from '../assets/logofinal.png';
import profile from '../assets/profile.png';
import { Save } from "@mui/icons-material";
import cart from '../assets/cart.png';
import { AccountBox, Visibility } from "@mui/icons-material";
import search from '../assets/search.png';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from '../Firebase';
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
// import Drawer from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Box } from "@mui/material";
function Navbar() {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const [state, setState] = useState({
        // top: false,
        left: false,
        // bottom: false,
        // right: false,
    });
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                return false;
            }
            return true;

        });

    }
    console.log(window.location.href);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box className="p-3 h-full overflow-hidden " style={{ 'backgroundColor': 'white' }}
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >


            <div className="flex flex-col mb-5">
                <div className="flex justify-center cursor-pointer" onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}><h1 className="font-semibold text-xs mt-1" style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/' || window.location.href == 'https://singhpublication.in/' ? '#315ED2' : '#D1D1D1'} ` }}>Home</h1> </div>
                <div className="flex justify-center mx-5 cursor-pointer" onClick={(e) => {
                    e.preventDefault();
                    navigate('/about');
                }}><h1 className="font-semibold text-xs mt-1" style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/about' ? '#315ED2' : '#D1D1D1'} ` }}>About Us</h1> </div>

                <div className="flex justify-center cursor-pointer"><h1 style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/contact' ? '#315ED2' : '#D1D1D1'} ` }} className="font-semibold text-xs mt-1" onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                }}>Contact Us</h1> </div>
            </div>
            {
                localStorage.getItem('pubuser') != null ? <ul className="flex flex-col items-end">


                    <li className="w-56 py-2 px-2 rounded" >
                        <Box onClick={toggleDrawer(anchor, false)}>
                            <Link className="no-underline text-black mx-2 font-semibold" to="/cart">Cart</Link>
                        </Box>
                    </li>

                    <li className="w-56 py-2 px-2 rounded" >
                        <Box onClick={toggleDrawer(anchor, false)}>
                            <Link className="no-underline text-black mx-2 font-semibold" to="/wishlist">Wishlist</Link>
                        </Box>
                    </li>
                    <li className="w-56 py-2 px-2 rounded" >
                        <Link className="no-underline text-black mx-2 font-semibold" to="/accountsetting">Account Settings</Link>
                    </li>


                    <li className="w-56 py-2 px-2 rounded" >
                        <Box onClick={toggleDrawer(anchor, false)}>
                            <h1 className="no-underline text-black mx-2 font-semibold" onClick={(e) => {
                                e.preventDefault();
                                localStorage.removeItem("pubuser");
                                auth.signOut();
                                navigate('/');
                            }}>Logout</h1>
                        </Box>
                    </li>

                </ul> : <div className="flex justify-around">
                    <button className=" text-white md:text-base text-xs  px-4 py-1 rounded-xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }} onClick={(e) => {
                        // console.log(user.accessToken);
                        e.preventDefault();
                        navigate('/login');
                    }}>
                        Login
                    </button>
                    <button className=" text-white md:text-base text-xs mx-3  px-4 py-1  rounded-xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }} onClick={(e) => {
                        // console.log(user.accessToken);
                        e.preventDefault();
                        navigate('/signup');
                    }}>
                        Signup
                    </button>
                </div>
            }
        </Box >
    );


    const [Visibility, setVisibility] = useState("hidden");

    return (
        <>
            <div className="md:hidden block navbar">
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        {/* <Button className='text-white mx-5 text-left w-20' onClick={toggleDrawer(anchor, true)}>Filters</Button> */}
                        <div className='md:hidden lg:hidden xl:hidden w-full flex items-center justify-between 2xl:hidden' >
                            <div className="flex items-center">
                                <Menu className='text-black mx-5 mt-0' onClick={toggleDrawer(anchor, true)} />

                            </div>
                            {/* <div className="rounded-3xl flex items-center p-3 mr-0 mt-2 mb-2" style={{ 'border': '1px solid #D1D1D1' }}>
                                <input type="text" className="focus:outline-none text-center w-52" placeholder="Search Here" />
                                <img className="w-6 cursor-pointer" src={search} alt="" />
                            </div> */}

                            <div className="flex items-center">
                                <Link to="/"><img src={Logo} className="w-20 p-3 mt-0"></img></Link>
                            </div>
                        </div>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            <div className="hidden md:flex w-full h-16 justify-between items-center py-5 navbar" >
                <div onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }} className="flex items-center pl-4 cursor-pointer">
                    <img src={Logo} className="w-24 h-full" alt="" />
                    
                </div>
                <div className="w-max pl-4 flex justify-center">
                    <div className="flex justify-center cursor-pointer" onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                    }}><h1 className="font-semibold text-xs mt-1" style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/' || window.location.href == 'https://singhpublication.in/' ? '#315ED2' : '#D1D1D1'} ` }}>Home</h1> </div>
                    <div className="flex justify-center mx-5 cursor-pointer" onClick={(e) => {
                        e.preventDefault();
                        navigate('/about');
                    }}><h1 className="font-semibold text-xs mt-1" style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/about' ? '#315ED2' : '#D1D1D1'} ` }}>About Us</h1> </div>

                    <div className="flex justify-center cursor-pointer"><h1 style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/contact' ? '#315ED2' : '#D1D1D1'} ` }} className="font-semibold text-xs mt-1" onClick={(e) => {
                        e.preventDefault();
                        navigate('/contact');
                    }}>Contact Us</h1> </div>
                    <div className="flex justify-center cursor-pointer ml-5"><h1 style={{ 'color': `${window.location.href == 'https://singhpublication.in/#/books' ? '#315ED2' : '#D1D1D1'} ` }} className="font-semibold text-xs mt-1" onClick={(e) => {
                        e.preventDefault();
                        navigate('/books');
                    }}>Books</h1> </div>
                </div>
                {localStorage.getItem('pubuser') != null ? <div className="flex items-center relative" >
                    {/* <div className="rounded-3xl flex items-center p-3 mr-6" style={{ 'border': '1px solid #D1D1D1' }}>
                        <input type="text" className="focus:outline-none text-center" placeholder="Search Here" />
                        <img className="w-6 cursor-pointer" src={search} alt="" />
                    </div> */}
                    <div onClick={(e) => {
                        e.preventDefault();
                        navigate('/wishlist');
                    }} className="w-12 h-12 ml-4 flex items-center justify-center rounded-full p-2 cursor-pointer" style={{ 'border': '1px solid #D1D1D1' }}>
                        <Favorite style={{ 'color': '#315ED2' }} className="w-5" alt="" />
                    </div>

                    <div onClick={(e) => {
                        e.preventDefault();
                        navigate('/cart');
                    }} className="w-12 h-12 ml-4 flex items-center justify-center rounded-full p-2 cursor-pointer" style={{ 'border': '1px solid #D1D1D1' }}>
                        <img className="w-5" src={cart} alt="" />
                    </div>
                    <div onClick={(e) => {
                        e.preventDefault();
                        if (Visibility === "hidden") {
                            setVisibility("visible");
                        }
                        else {
                            setVisibility("hidden");
                        }
                    }} className="z-20 w-12 h-12 ml-4 flex items-center justify-center rounded-full p-2 cursor-pointer" style={{ 'border': '1px solid #D1D1D1' }}>
                        <img className="w-5" src={profile} alt="" />
                    </div>
                    <div className={Visibility + " " + `absolute right-0 px-4 py-2 top-16 h-max w-48 rounded flex justify-center flex-col items-center related`}>
                        <div style={{
                            'border': '1px solid #777777',




                        }} onClick={(e) => {
                            e.preventDefault();
                            navigate('/accountsetting');
                            setVisibility("hidden");
                        }} className=" w-44  my-1 flex items-center justify-center cursor-pointer py-2 px-4 rounded" >
                            <h1 className="text-sm font-medium " style={{ 'color': 'rgba(153, 153, 153, 1)' }}>Account Settings</h1>
                        </div>



                        <div style={{
                            'border': '1px solid #777777',




                        }} onClick={(e) => {
                            e.preventDefault();
                            navigate('/orders');
                            setVisibility("hidden");
                        }} className=" w-44 py-2 px-4 rounded  my-1 flex items-center justify-center cursor-pointer" >
                            <h1 className="text-sm font-medium" style={{ 'color': 'rgba(153, 153, 153, 1)' }}>Orders</h1>
                        </div>
                        <div style={{
                            'border': '1px solid #777777',




                        }} onClick={(e) => {
                            e.preventDefault();
                            auth.signOut();
                            localStorage.removeItem("pubuser");
                            navigate('/');
                            setVisibility("hidden");
                        }} className="w-44 py-2 px-4 rounded  my-1 flex items-center justify-center cursor-pointer" >
                            <h1 className="text-sm font-medium " style={{ 'color': 'rgba(153, 153, 153, 1)' }}>Logout</h1>
                        </div>

                    </div>

                </div> : <div className="flex">
                    <button className=" text-white md:text-base text-xs  px-4 py-1 rounded-xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }} onClick={(e) => {
                        // console.log(user.accessToken);
                        e.preventDefault();
                        navigate('/login');
                    }}>
                        Login
                    </button>
                    <button className=" text-white md:text-base text-xs mx-3  px-4 py-1  rounded-xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }} onClick={(e) => {
                        // console.log(user.accessToken);
                        e.preventDefault();
                        navigate('/signup');
                    }}>
                        Signup
                    </button>
                </div>
                }
            </div>
        </>
    );
}

export default Navbar;