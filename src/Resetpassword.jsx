import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import playstore from './assets/undraw_login_re_4vu2.svg';
import LoadingBar from "./comps/Loadingbar";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


function Resetpassword() {
    const navigate = useNavigate();
    function isAlphanumericPassword(str) {
        return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(str);
    }
    const location=useLocation();
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [loading, setloading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    useEffect(() => {
        document.title = 'Singh Publication | Login';
    }, []);
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {loading && <LoadingBar />}
            <div className="log-in min-h-5/6  grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="welcome-singh h-full p-[3vw] w-full flex flex-col justify-center items-center text-white bg-[#315ED2]">
                    <div className="svg"><img src={playstore} className="w-1/2 mx-auto" alt="..."></img></div>
                    <h1 className="text-5xl pb-2  w-fit border-b-4 mx-auto border-white font-medium text-center my-5 md:my-10 leading-[4rem]">Welcome Back</h1>
                </div>
                <div className="log-in-form flex items-center w-full px-[5vw] py-[2vw] bg-white">
                    <form action="" className="mx-auto w-full grid gap-[3vw] p-[1vw] rounded-md shadow-2xl">
                        <div className="text">
                            <h1 className="py-5 text-6xl font-semibold">Reset Your Password</h1>
                        </div>
                        <div className="input grid gap-5">
                            
                            <div className="">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-lg ">Password</label>
                                    
                                </div>

                                <input value={password} onChange={(e) => {
                                    e.preventDefault();
                                    setPassword(e.target.value);
                                }} className="w-full px-3 py-5  bg-amber-100 rounded-md"
                                    type="password"
                                    placeholder="Password"
                                    name="password" id="password"

                                />
                            </div>
                            <div className="">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password2" className="text-lg ">Confirm Password</label>
                                    
                                </div>

                                <input value={password2} onChange={(e) => {
                                    e.preventDefault();
                                    setPassword2(e.target.value);
                                }} className="w-full px-3 py-5  bg-amber-100 rounded-md"
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password2" id="password2"

                                />
                            </div>
                        </div>

                        <div className="flex justify-center">

                            <button onClick={(e) => {
                                e.preventDefault();
                                if(location.state.email===undefined){
                                    toast.warning("Something is wrong! Kindly check your EMAIL or PASSWORD.");
                                    return;
                                } 
                                if(password!==password2){
                                    toast.warning("Passwords do not match!");
                                    return;
                                }
                                if(!isAlphanumericPassword(password)){
                                    toast.warning("Password must contain at least one letter and one number!");
                                    return;
                                }
                                setloading(true);
                                axios.post("https://singhpublication.in/api/user/resetpassword", {
                                    email: location.state.email,
                                    // mobileNumber: mobileNumber,
                                    newpassword: password,
                                }).then((res) => {
                                    console.log(res);
                                    setloading(false);
                                    if (res.status === 200) {
                                        // localStorage.setItem("pubuser", JSON.stringify(res.data));
                                        // console.log(localStorage.getItem("pubuser"));
                                        navigate("/login",);
                                    } else {
                                        toast.warning("Something is wrong! Kindly check your EMAIL or PASSWORD.");
                                    }
                                }).catch((err) => {
                                    setloading(false);
                                    alert("Something is wrong! Kindly check your EMAIL or PASSWORD.");
                                    console.log(err);
                                }
                                )

                            }} className="w-fit px-14 py-4 bg-white border-2 border-[#315ED2] text-[#315ED2] rounded-full">
                                Submit
                            </button>
                        </div>
                        <p className="text-lg text-center text-gray-400 flex w-fit mx-auto">Don&#x27;t have an account yet? <button onClick={(e) => {
                            e.preventDefault();
                            navigate("/signup");

                        }} className="text-[#315ED2] font-normal text-xl ml-2">
                            Sign up
                        </button>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Resetpassword;