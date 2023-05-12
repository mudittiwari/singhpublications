import React from "react";
import sample from './assets/sample.png';
import book from './assets/book.png';
import star from './assets/star.png';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function BookComp() {
    return (
        <div className=' my-4 mx-2 h-36 rounded-xl p-2 relative flex items-center' style={{ 'border': '1px solid #315ED2', 'width': '400px' }} >
            <img src={book} className="w-20 h-full " alt="" />
            <div className='ml-2 mr-5'>
                <h1 className="text-md font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2' }}>Think Outside The Box</h1>
                <h1 className="text-base font-semibold mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>Paperback</h1>
                <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>Art | Life | Goals</h1>
                <div className='w-max mt-1 ml-0 flex items-center'>
                    <h1 className="text-base font-medium mb-0 mr-1  w-max mt-0" style={{ 'color': '#777777' }}>4.1</h1>
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                </div>
               
                <div className="flex justify-evenly mt-1">
                <button className=" text-white px-4 py-0 mx-5  rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                    Listen
                </button>
                <button className=" text-white px-4 py-0 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                    Read
                </button>
                </div>
            </div>
            
        </div>
    );
}

function PurchasedBooks() {
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
        // checkuser();
        document.title = 'Singh Publication | Books';
    },[]);
    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='w-4/5  flex justify-center flex-col items-center flex-wrap' >
                    <h1 className="text-2xl w-max font-medium mb-5 mt-5" style={{ 'color': '#315ED2' }}>Purchased Books</h1>
                    <div className='w-full flex justify-around flex-wrap'>
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchasedBooks;