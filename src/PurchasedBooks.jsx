import React from "react";
import sample from './assets/sample.png';
import book from './assets/book.png';
import star from './assets/star.png';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import app from './Firebase';
import LoadingBar from "./comps/Loadingbar";
function BookComp(props) {
    return (
        <div className=' my-4 mx-2 h-36 rounded-xl p-2 relative flex items-center' style={{ 'border': '1px solid #315ED2', 'width': '400px' }} >
            <img src={props.book.image_url} className="w-20 h-full " alt="" />
            <div className='ml-2 mr-5'>
                <h1 className="text-md font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2' }}>{props.book.title}</h1>
                <h1 className="text-base font-semibold mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{props.book.category}</h1>
                <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{props.book.subtitle}</h1>
                <div className='w-max mt-1 ml-0 flex items-center'>
                    <h1 className="text-base font-medium mb-0 mr-1  w-max mt-0" style={{ 'color': '#777777' }}>{props.book.rating}</h1>
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                </div>
               
                <div className="flex justify-evenly mt-1">
                <button onClick={(e)=>{
                    e.preventDefault();
                    if(props.book.category=='ebook')
                        alert("This is an Ebook")
                    
                }} className=" text-white px-4 py-0 mx-5  rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                    Listen
                </button>
                <button  onClick={(e)=>{
                    e.preventDefault();
                    if(props.book.category=='audiobook')
                        alert("This is an audiobook")
                    else
                        window.open(props.book.file);
                    
                }} className=" text-white px-4 py-0 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                    Read
                </button>
                </div>
            </div>
            
        </div>
    );
}

function PurchasedBooks() {
    const navigate = useNavigate();
    const [user, setuser] = React.useState(JSON.parse(localStorage.getItem('pubuser')));
    const [orders, setorders] = React.useState([]);
    const [loading, setloading] = React.useState(false);
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            }

        });
    }
    async function getitems() {
        setloading(true);
        let ordrs = [];
        await axios.get(`http://localhost:5000/api/order/getuserorders`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }, params: { id: user.id }
        }).then(async (res) => {
            for (let i = 0; i < res.data.length; i++) {
                let arr = [];
                for (let j = 0; j < res.data[i].ProductsArray.length; j++) {
                    await axios.get(`http://localhost:5000/api/product/products`, { params: { id: res.data[i].ProductsArray[j] } }).then((res) => {
                        if(res.data.category=='ebook' || res.data.category=='audiobook')
                            arr.push(res.data);
                    }
                    ).catch((err) => {
                        console.log(err);
                    }
                    )
                }

                ordrs.push(...arr);
            }

        }
        ).catch((err) => {
            alert("error");
            console.log(err);
        }
        )
        setorders(ordrs);
        setloading(false);
    }
    useEffect(() => {
        checkuser();
        getitems();
        document.title = 'Singh Publication | Orders';
    }, []);
    useEffect(() => {
        // checkuser();
        document.title = 'Singh Publication | Books';
    },[]);
    return (
        <>
        {loading && <LoadingBar/>}
            <div className='w-full flex justify-center'>
                <div className='w-4/5  flex justify-center flex-col items-center flex-wrap' >
                    <h1 className="text-2xl w-max font-medium mb-5 mt-5" style={{ 'color': '#315ED2' }}>Purchased Books</h1>
                    <div className='w-full flex justify-around flex-wrap'>
                        {orders.map((item, index) => {
                            return <BookComp book={item} key={index}/>
                        })}
                        {/* <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchasedBooks;