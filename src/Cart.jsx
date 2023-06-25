import React, { useEffect } from 'react';
import sample from './assets/sample.png';
import book from './assets/book.png';
import star from './assets/star.png';
import { useState } from 'react';
import axios from 'axios';
import playstore from './assets/undraw_empty_cart_co35.svg';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
import LoadingBar from './comps/Loadingbar';
function BookComp(props) {
    const navigate = useNavigate();
    return (
        <div className=' mx-2 rounded-xl p-5 flex flex-wrap justify-center gap-5' style={{ 'border': '1px solid #315ED2', }} >
            <img src={props.prod.image_url} className="w-40 mx-auto" alt="" onClick={(e) => {
                e.preventDefault();
                navigate('/product', { state: props.prod })
            }} />
            <div className='' >
                <div onClick={(e) => {
                    e.preventDefault();
                    navigate('/product', { state: props.prod })
                }}>

                    <h1 className="text-md font-bold" style={{ 'color': '#315ED2' }}>{props.prod.title}</h1>
                    <h1 className="text-base font-semibold" style={{ 'color': '#777777' }}>{props.prod.category}</h1>
                    <h1 className="text-sm font-medium" style={{ 'color': '#777777' }}>{props.prod.subtitle}</h1>
                    <div className='w-fit mt-1 flex items-center'>
                        <h1 className="text-base font-medium mr-1" style={{ 'color': '#777777' }}>{props.prod.rating}</h1>
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                    </div>
                    <h1 className="text-sm font-medium" style={{ 'color': '#777777' }}>11 Jan 2023</h1>
                </div>
                <div className='mt-5 flex flex-wrap items-center justify-around gap-2 pt-1 border-t-2'>
                    <h1 className="md:text-2xl text-lg font-bold" style={{ 'color': '#315ED2' }}>{props.prod.price} Rs.</h1>
                    <button className=" btn mt-3 cursor-pointer w-fit px-7 py-3 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full" onClick={(e) => {
                        // console.log(user.accessToken);
                        props.setloading(true);
                        e.preventDefault();
                        axios.post("https://singhpublications.onrender.com/api/user/removefromcart", {


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
                            props.setloading(false);
                            let newuser = res.data;
                            newuser['accessToken'] = props.user.accessToken;
                            localStorage.setItem('pubuser', JSON.stringify(newuser));
                            props.setuser(newuser);
                            props.getitems();
                            // localStorage.setItem('pubuser', JSON.stringify(res.data));
                        }
                        ).catch((err) => {
                            props.setloading(false);
                            alert("error");
                            console.log(err);
                        }
                        )

                    }}>
                        Remove
                    </button>
                </div>
            </div>
            {/* <div style={{ 'width': "1px", 'height': '150px', 'backgroundColor': '#315ED2' }}></div> */}
        </div>
    );
}

function Cart() {
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    const [loading, setloading] = useState(true);
    const [items, setitems] = useState([]);
    const [total_price, settotal_price] = useState(0);
    async function checkuser() {
        if(localStorage.getItem('pubuser')===null){
            navigate('/login');
        }
    }
    async function getitems() {
        let arr = [];
        let price = 0;
        setloading(true);
        console.log(localStorage.getItem('pubuser'));
        let cart = JSON.parse(localStorage.getItem('pubuser')).cart;
        console.log(cart);
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            await axios.get(`https://singhpublications.onrender.com/api/product/products`, { params: { id: element } }).then((res) => {
                arr.push(res.data);
                price += res.data.price;
            }
            ).catch((err) => {
                console.log(err);
                alert("error");
            }
            )
        }
        setloading(false);
        setitems(arr);
        settotal_price(price);
    }
    useEffect(() => {
        checkuser();
        getitems();
        document.title = 'Singh Publication | Cart';
    }, []);

    return (
        <>
            {loading && <LoadingBar />}
            {/* <div className='w-full px-5'>
                <div className=' w-full min-h-[100vh] py-10 relative grid grid-cols-1 md:grid-cols-2 items-center' >
                    <div className='w-full h-fit sticky top-28 rounded-xl p-5 text-white text-center flex flex-col items-center bg-[#315ED2]'>
                        <h1 className="text-5xl font-medium text-center">Cart</h1>
                        <div className='mt-10'>
                            <h1 className="text-3xl font-bold" >{items.length}</h1>
                            <h1 className="text-lg font-semibold" >Items</h1>
                        </div>
                        <div className='w-fit'>
                            <h2 className="text-lg sm:text-3xl font-bold">Total Rs. {total_price} </h2>
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (items.length == 0) {
                                    alert("No items in cart");
                                    return;
                                }
                                navigate('/deliveryaddress', { state: { "totalAmount": total_price } });
                            }} className=" btn mt-5 cursor-pointer w-fit px-2 sm:px-5 py-4 bg-white border-2 border-[#315ED2] hover:bg-transparent hover:border-white text-[#315ED2] hover:text-white  font-bold rounded-full">
                                Proceed to Buy
                            </button>

                        </div>

                    </div>
                    <div className='w-full flex justify-center flex-wrap  gap-10'>
                        {
                            items.length != 0 ?
                                items.map((item, index) => {
                                    return (
                                        <BookComp setloading={setloading} key={index} prod={item} user={user} setuser={setuser} getitems={getitems} />
                                    )
                                }
                                ) : <h1 className="text-2xl font-medium mb-5 mt-5" style={{ 'color': 'gray' }}>No item in Cart</h1>
                        }
                    </div>

                </div>
            </div> */}


            <div className="log-in min-h-5/6  grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="welcome-singh h-full p-[3vw] w-full flex justify-center items-center text-[#315ED2] sm:text-white sm:bg-[#315ED2]">
                    <div className="text text-center">
                        <div className="svg hidden sm:block"><img src={playstore} className="w-1/2 mx-auto" alt="..."></img></div>
                        <h1 className="text-5xl font-medium text-center mt-5">Cart</h1>
                    </div>
                </div>
                <div className="w-full relative py-[2vw] bg-white z-10">
                    <div className="items-quantity px-5 mb-5 text-white sm:text-black sticky sm:relative top-20 sm:top-0 bg-[#315ED2] sm:bg-white py-2 sm:py-5 flex items-center justify-center gap-5">
                        <div className=' flex items-center gap-3 border-r-2 pr-5'>
                            <h1 className="text-3xl font-bold" >{items.length}</h1>
                            <h1 className="text-lg font-semibold" >Items</h1>
                        </div>
                        <div className='w-fit flex flex-wrap items-center sm:gap-5'>
                            <h2 className="text-lg sm:text-3xl font-bold">Total Rs. {total_price} </h2>
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (items.length == 0) {
                                    alert("No items in cart");
                                    return;
                                }
                                navigate('/deliveryaddress', { state: { "totalAmount": total_price,'type':'regular' } });
                            }} className="btn cursor-pointer w-fit px-2 sm:px-5 py-3 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:border-white text-[#315ED2] hover:text-white  font-bold rounded-full">
                                Proceed to Buy
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex justify-center flex-wrap  gap-10'>
                        {
                            items.length != 0 ?
                                items.map((item, index) => {
                                    return (
                                        <BookComp setloading={setloading} key={index} prod={item} user={user} setuser={setuser} getitems={getitems} />
                                    )
                                }
                                ) : <h1 className="text-2xl font-medium mb-5 mt-5" style={{ 'color': 'gray' }}>No item in Cart</h1>
                        }
                    </div>
                </div>
            </div>


        </>
    );
}

export default Cart;