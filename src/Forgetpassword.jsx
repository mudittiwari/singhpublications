import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import playstore from './assets/undraw_secure_login_pdn4.svg';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
import LoadingBar from "./comps/Loadingbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Transform } from "@mui/icons-material";
function Forgetpassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [one, setcode1] = useState(1);
    const [two, setcode2] = useState(1);
    const [three, setcode3] = useState(1);
    const [four, setcode4] = useState(1);
    const [five, setcode5] = useState(1);
    const [loading, setLoading] = React.useState(false);
    const [six, setcode6] = useState(1);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const auth = getAuth(app);
    const [result, setresult] = useState();
    const matchcode = async () => {

        let code = one + two + three + four + five + six;
        if(code==location.state.otp)
        {
            console.log('matched');
            navigate('/resetpassword', { state: { email: location.state.email } });
            
        }
        else{
            console.log('not matched')
            toast.warning('Please enter a valid OTP');
        }
    }

    useEffect(() => {
        document.title = 'Singh Publication | Forget Password';
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
            <div id="sign-in-button"></div>
            <div className="w-screen h-max py-8 flex items-center justify-center">
            </div>
            <div className="otp min-h-5/6  grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="welcome-singh h-full p-[3vw] w-full flex flex-col justify-center items-center text-white bg-[#315ED2]">
                    <div className="svg"><img src={playstore} className="w-1/2 mx-auto" alt="..."></img></div>
                    <h1 className="text-5xl pb-2  w-fit border-b-4 mx-auto border-white font-medium text-center my-5 md:my-10 leading-[4rem]">Verify your <br /> OTP</h1>
                </div>
                <div className="otp-form flex items-center w-full px-[5vw] py-[5vw] bg-white">
                    <form action="" className="mx-auto w-full grid justify-center text-center gap-[1vw] p-[1vw] rounded-md shadow-2xl">
                        <div className="text">
                            <h1 className="py-5 text-3xl font-semibold ">Verification code is sent to {location.state.email}</h1>
                        </div>
                        <div className="input flex gap-5 ">
                            <div className='h-6 w-6 md:w-14 md:h-14 mx-4 related flex items-center rounded-md'>
                                <input ref={ref1} onChange={(e) => {
                                    e.preventDefault();
                                    setcode1(e.target.value);
                                    if (e.target.value.length === 1) {
                                        ref2.current.focus();
                                    }
                                }} type="text" className='outline-none w-full text-center h-full rounded-md' />
                            </div>
                            <div className='h-6 w-6 md:w-14 md:h-14 mx-4 related flex items-center rounded-md'>
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        ref1.current.focus();
                                    }
                                }} ref={ref2} onChange={(e) => {
                                    e.preventDefault();
                                    setcode2(e.target.value);
                                    if (e.target.value.length === 1) {
                                        ref3.current.focus();
                                    }
                                }} type="text" className='outline-none w-full text-center h-full rounded-md' />
                            </div>
                            <div className='h-6 w-6 md:w-14 md:h-14 mx-4 related flex items-center rounded-md'>
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        ref2.current.focus();
                                    }
                                }} ref={ref3} onChange={(e) => {
                                    e.preventDefault();
                                    setcode3(e.target.value);
                                    if (e.target.value.length === 1) {
                                        ref4.current.focus();
                                    }
                                }} type="text" className='outline-none w-full text-center h-full rounded-md' />
                            </div>
                            <div className='h-6 w-6 md:w-14 md:h-14 mx-4 related flex items-center rounded-md'>
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        ref3.current.focus();
                                    }
                                }} ref={ref4} onChange={(e) => {
                                    e.preventDefault();
                                    setcode4(e.target.value);
                                    if (e.target.value.length === 1) {
                                        ref5.current.focus();
                                    }
                                }} type="text" className='outline-none w-full text-center h-full rounded-md' />
                            </div>
                            <div className='h-6 w-6 md:w-14 md:h-14 mx-4 related flex items-center rounded-md'>
                                <input ref={ref5} onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        ref4.current.focus();
                                    }
                                }} onChange={(e) => {
                                    e.preventDefault();
                                    setcode5(e.target.value);
                                    if (e.target.value.length === 1) {
                                        ref6.current.focus();
                                    }
                                }} type="text" className='outline-none w-full text-center h-full rounded-md' />
                            </div>
                            <div className='h-6 w-6 md:w-14 md:h-14 mx-4 related flex items-center rounded-md'>
                                <input onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        ref5.current.focus();
                                    }
                                }} ref={ref6} onChange={(e) => {
                                    e.preventDefault();
                                    setcode6(e.target.value);
                                }} type="text" className='outline-none w-full text-center h-full rounded-md' />
                            </div>
                        </div>
                        <div className="flex mt-5 justify-center">
                            <button onClick={(e) => {
                                e.preventDefault();
                                // navigate('/');
                                matchcode()
                            }} className=" w-fit mt-10 px-14 py-3 bg-white border-2 border-[#315ED2] text-[#315ED2] rounded-full" >
                                Verify
                            </button>
                        </div>
                    </form>
                </div >
            </div >




        </>
    );
}
export default Forgetpassword;