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
import { useRef } from "react";
import LoadingBar from "./comps/Loadingbar";
import audio from '../src/assets/audio.mp3';
const AudioPlayer = ({visible ,audioSrc }) => {
    const audioRef = useRef(null);
  
    useEffect(() => {
      audioRef.current.play();
    }, [visible]);
  
    return (
      <audio className={visible} ref={audioRef} src={audioSrc} controls />
    );
  };
function BookComp(props) {
    const navigate = useNavigate();
    return (
        <div className='  rounded-xl p-5 relative flex justify-center flex-wrap gap-5' style={{ 'border': '1px solid #315ED2', 'width': '400px' }} >
            <img src={props.book.image_url} className="h-40" alt="" />
            <div className='flex flex-col items-start text-center'>
                <h1 className="text-md font-bold" style={{ 'color': '#315ED2' }}>{props.book.title}</h1>
                <h1 className="text-base font-semibold" style={{ 'color': '#777777' }}>{props.book.category}</h1>
                <h1 className="text-sm font-medium" style={{ 'color': '#777777' }}>{props.book.subtitle}</h1>
                <div className=' mt-1 flex items-center justify-center'>
                    <h1 className="text-base font-medium mr-1" style={{ 'color': '#777777' }}>{props.book.rating}</h1>
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                </div>

                <div className="flex justify-left mt-3 flex-wrap gap-5">
                    <button onClick={(e) => {
                        e.preventDefault();
                        if(props.book.category == 'ebook')
                        {
                            alert("This is an Ebook")
                            return;
                        }
                        // if(props.visible=="hidden")
                        //     props.setvisible("visible");
                        // else
                        //     props.setvisible("hidden");
                        // props.setvisible(!props.visible);
                        // if (props.book.category == 'ebook')
                        //     alert("This is an Ebook")

                    }} className=" btn cursor-pointer w-fit px-5 py-2 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full">
                        Listen
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        if (props.book.category == 'audiobook')
                            alert("This is an audiobook")
                        else
                            navigate('/viewbook');

                    }} className=" btn cursor-pointer w-fit px-5 py-2 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full">
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
    const [visible, setvisible] = React.useState("hidden");
   async function checkuser() {
        if(localStorage.getItem('pubuser')===null){
            navigate('/login');
        }
    }
    async function getitems() {
        setloading(true);
        let ordrs = [];
        await axios.get(`https://singhpublication.in/api/order/getuserorders`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }, params: { id: user.id }
        }).then(async (res) => {
            for (let i = 0; i < res.data.length; i++) {
                let arr = [];
                for (let j = 0; j < res.data[i].ProductsArray.length; j++) {
                    await axios.get(`https://singhpublication.in/api/product/products`, { params: { id: res.data[i].ProductsArray[j] } }).then((res) => {
                        if ((res.data.category == 'ebook' || res.data.category == 'audiobook'))
                        {
                            for(let i=0;i<ordrs.length;i++){
                                if(ordrs[i].id==res.data.id)
                                    return;
                            }
                            arr.push(res.data);
                        }
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
        console.log(ordrs);
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
    }, []);
    return (
        <>
            {loading && <LoadingBar />}
            <AudioPlayer visible={visible} audioSrc={audio} />
            <div className='w-full px-5'>
                <div className='w-full  flex justify-center flex-col items-center flex-wrap' >
                    <h1 className="text-5xl text-center font-medium mb-5 mt-5" style={{ 'color': '#315ED2' }}>Purchased Books</h1>
                    <div className='w-full flex justify-center flex-wrap gap-5 my-10'>
                        
                        {orders.length == 0 ? <h1 className="text-2xl font-medium mb-5 mt-5" style={{ 'color': 'gray' }}>No Book Purchased Till Now</h1> : orders.map((item, index) => {
                            return (
                                <BookComp key={index} book={item} user={user} setvisible={setvisible} visible={visible} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PurchasedBooks;