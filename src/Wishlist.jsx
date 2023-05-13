import React from 'react';
import sample from './assets/sample.png';
import book from './assets/book.png';
import star from './assets/star.png';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function BookComp(props) {
    return (
        <div className=' my-4 mx-2 h-36 rounded-xl p-2 relative flex items-center' style={{ 'border': '1px solid #315ED2', 'width': '400px' }} >
            <img src={props.prod.image_url} className="w-20 h-full " alt="" />
            <div className='ml-2 md:mr-5 mr-2'>
                <h1 className="text-md font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2' }}>{props.prod.title}</h1>
                <h1 className="text-base font-semibold mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{props.prod.category}</h1>
                <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{props.prod.subtitle}</h1>
                <div className='w-max mt-1 ml-0 flex items-center'>
                    <h1 className="text-base font-medium mb-0 mr-1  w-max mt-0" style={{ 'color': '#777777' }}>{props.prod.rating}</h1>
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                </div>
                <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>11 Jan 2023</h1>
            </div>
            <div style={{ 'width': "1px", 'height': '80%', 'backgroundColor': '#315ED2' }}></div>
            <div className='h-full w-full justify-center flex flex-col items-center'>
                <h1 className="md:text-2xl text-lg font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2' }}>{props.prod.price} Rs.</h1>
                <button className=" text-white md:text-base text-xs md:px-4 px-2 py-1 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }} onClick={(e) => {
                            // console.log(user.accessToken);
                            e.preventDefault();
                            axios.post("https://singh-publication.onrender.com/api/user/removefromwishlist", {


                                "product_id": props.prod.id,

                                //how to pass query params and headers in axios

                            }, {
                                headers: {
                                    'Authorization': `Bearer ${props.user.accessToken}`
                                },
                                params: {
                                    'id': props.user.id
                                }
                            },).then((res) => {
                                let newuser=res.data;
                                newuser['accessToken']=props.user.accessToken;
                                localStorage.setItem('pubuser', JSON.stringify(newuser));
                                props.setuser(newuser);
                                props.getitems();
                                // localStorage.setItem('pubuser', JSON.stringify(res.data));
                            }
                            ).catch((err) => {
                                alert("error");
                                console.log(err);
                            }
                            )

                        }}>
                    Remove
                </button>
            </div>
        </div>
    );
}


function Wishlist() {
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    const [items, setitems] = useState([]);
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            }

        });
    }
    async function getitems()
    {
        let arr=[];
        console.log(localStorage.getItem('pubuser'));
        let wishlist=JSON.parse(localStorage.getItem('pubuser')).wishlist;
        for (let index = 0; index < wishlist.length; index++) {
            const element = wishlist[index];
            await axios.get(`https://singh-publication.onrender.com/api/product/products`,{params:{id:element}}).then((res)=>{
                arr.push(res.data);
            }
            ).catch((err)=>{
                console.log(err);
                alert("error");
            }
            )
        }
        setitems(arr);
    }
    useEffect(() => {
        checkuser();
        getitems();
        document.title = 'Singh Publication | Wishlist';
    }, []);
    return (
        <>
            <div className='w-full flex justify-center'>
                <div className='md:w-4/5 w-full  flex justify-center flex-col items-center flex-wrap' >
                    <h1 className="text-2xl w-max font-medium mb-5 mt-5" style={{ 'color': '#315ED2' }}>Wishlist</h1>
                    <div className='w-full flex justify-around flex-wrap'>

                        {items.length!=0?items.map((item,index) => {
                            return (
                                <BookComp key={index} prod={item} user={user} setuser={setuser} getitems={getitems} />
                            )
                        }):<h1 className="text-2xl font-medium mb-5 mt-5" style={{ 'color': '#315ED2' }}>No items in wishlist</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Wishlist;