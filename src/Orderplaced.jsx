import React from "react";
// import orderplaced from './assets/—Pngtree—check mark icon design template_4085369.png';
import orderplaced from './assets/orderplaced.png';
import playstore from './assets/undraw_reading_time_re_phf7.svg';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
import { useEffect } from "react";
function Orderplaced() {
    const navigate = useNavigate();
   async function checkuser() {
        if(localStorage.getItem('pubuser')===null){
            navigate('/login');
        }
    }
    useEffect(() => {
        checkuser();
        document.title = 'Singh Publication';
    }, []);

    return (
        <>

            <div className="order-placed min-h-5/6  grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="welcome-singh h-full p-[3vw] w-full flex flex-col justify-center items-center text-white bg-[#315ED2]">
                    <div className="svg"><img src={playstore} className="w-1/2 mx-auto" alt="..."></img></div>
                    <h1 className="text-5xl pb-2  w-fit border-b-4 mx-auto border-white font-medium text-center my-5 md:my-10 leading-[4rem]">Enjoy<br />Reading</h1>
                </div>
                <div className="order-placed flex items-center w-full px-[5vw] bg-white p-9">
                    <form action="" className="mx-auto w-full grid gap-[1vw] p-[3vw] rounded-md shadow-2xl">
                        <div className="mx-auto">
                            <img src={orderplaced} alt="orderplaced" className="w-1/2 mx-auto animate-bounce" />
                        </div>
                        <div className="text text-center text-[#39B54A]">
                            <h1 className="py-5 text-6xl font-semibold">Congratulations!</h1>
                            <h1 className="py-5 text-6xl font-semibold">Order placed successfully</h1>
                        </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }} className="w-fit mx-auto px-14 py-4 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] rounded-full">
                            Explore More                        </button>
                    </form>
                </div>
            </div>



        </>
    );
}

export default Orderplaced;