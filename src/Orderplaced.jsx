import React from "react";
import orderplaced from './assets/orderplaced.png';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
import { useEffect } from "react";
function Orderplaced() {
    const navigate = useNavigate();
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            }

        });
    }
    useEffect(() => {
        checkuser();
    }, []);

    return (
        <>
            <div className="flex items-center justify-center flex-col py-10">
                <div className="w-64">
                    <img src={orderplaced} alt="orderplaced" />
                </div>
                <h1 className="text-base w-max font-semibold mb-0 mt-5" style={{ 'color': '#315ED2' }}>Congratulations!</h1>
                <h1 className="text-base w-max font-semibold mb-0 mt-1" style={{ 'color': '#315ED2' }}>Order placed successfully</h1>
                <button onClick={(e)=>{
                                e.preventDefault();
                                navigate('/');
                            }} className=" text-white px-4 py-1 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                                Home
                            </button>
            </div>
        </>
    );
}

export default Orderplaced;