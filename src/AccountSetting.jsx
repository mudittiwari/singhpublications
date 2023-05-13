import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function AccountSetting() {
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
        document.title = 'Singh Publication | Account Settings';
    }, []);
    return (
        <>
            <div className="w-screen h-max py-8 flex items-center justify-center
            ">
                <div className="w-4/5 h-max py-10 bg-white flex flex-col items-center justify-center rounded-lg
            " style={{ 'border': '1px solid #777777' }}>
                    <h1 className="text-2xl font-medium mb-5" style={{ 'color': '#315ED2' }}>Account Setting</h1>
                    <button onClick={(e) => {
                            e.preventDefault();
                            navigate('/profilesetting');
                        }} className="  px-12 py-2 mt-3 focus:outline-none rounded-lg" style={{
                           
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                            'color': 'white',
                            'backgroundColor': '#315ED2'
                        }}>
                        Profile Settings
                    </button>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        navigate('/billingaddress');
                    }} className="  px-12 py-2 mb-1 mt-3 focus:outline-none rounded-lg" style={{
                            
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                            'color': 'white',
                            'backgroundColor': '#315ED2'
                        }}>
                        Billing Address
                    </button>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        navigate('/shippingaddress');
                    }} className="  px-12 py-2 mt-3 focus:outline-none rounded-lg" style={{
                            
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                            'color': 'white',
                            'backgroundColor': '#315ED2'
                        }}>
                        Shipping Address
                    </button>
                    
                   
                </div>
            </div>
        </>
    );
}
export default AccountSetting;