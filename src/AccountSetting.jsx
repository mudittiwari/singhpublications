import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import playstore from './assets/undraw_settings_tab_mgiw.svg';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function AccountSetting() {
    const [loading, setloading] = React.useState(false);
    const navigate = useNavigate();
   async function checkuser() {
        if(localStorage.getItem('pubuser')===null){
            navigate('/login');
        }
    }

    useEffect(() => {
        checkuser();
        document.title = 'Singh Publication | Account Settings';
    }, []);
    return (
        <>
            <div className="billing min-h-5/6  grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="welcome-singh h-full p-[3vw] w-full flex flex-col justify-center items-center text-white bg-[#315ED2]">
                    <div className="svg"><img src={playstore} className="w-1/2 mx-auto" alt="..."></img></div>
                    <h1 className="text-5xl pb-2  w-fit border-b-4 mx-auto border-white font-medium text-center my-5 md:my-10 leading-[4rem]">Here you can change your<br />Account Preferance</h1>
                </div>
                <div className="billing-form flex items-center w-full px-[5vw] py-[2vw] bg-white">
                    <form action="" className="mx-auto w-full grid p-[3vw] rounded-md shadow-2xl">
                        <div className="text">
                            <h1 className="py-5 text-6xl font-semibold text-center">Account Setting</h1>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            navigate('/profilesetting');
                        }} className="btn mt-10 cursor-pointer w-full px-14 py-4 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full">
                            Profile Settings
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            navigate('/billingaddress');
                        }} className="btn mt-10 cursor-pointer w-full px-14 py-4 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full" >
                            Billing Address
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            navigate('/shippingaddress');
                        }} className="btn mt-10 cursor-pointer w-full px-14 py-4 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full" >
                            Shipping Address
                        </button>

                    </form>
                </div>
            </div>


        </>
    );
}
export default AccountSetting;