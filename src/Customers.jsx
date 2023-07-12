import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import playstore from './assets/undraw_empty_cart_co35.svg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import app from './Firebase';
import LoadingBar from './comps/Loadingbar';
function BookComp(props) {
    const navigate = useNavigate();
    return (

        <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div class="pb-4 md:pb-8 w-full md:w-40">
                <img src={props.prod.image_url} className="w-1/3 md:w-1/2 mx-auto" alt="..."></img>
            </div>
            <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div class="w-full flex flex-col justify-start items-start space-y-8">

                    <div class="flex justify-start items-start text-gray-800 flex-col space-y-2">
                        <h1 className="text-md font-bold" >{props.prod.title}</h1>
                        <h1 className="text-md font-bold" >{props.prod.category}</h1>
                    </div>
                </div>
                <div class="flex justify-between space-x-8 items-start w-full">
                    <p class="text-base  xl:text-lg leading-6">{ props.prod.price} <span class="text-red-300 line-through"> {props.prod.price}</span></p>
                    <p class="text-base  xl:text-lg leading-6 text-gray-800">01</p>
                    <p class="text-base  xl:text-lg font-semibold leading-6 text-gray-800">{props.code===props.prod.title && props.couponstatus?0:props.prod.price}</p>
                </div>
            </div>
        </div>
    );
}

function Customers() {
    const location = useLocation();
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
            await axios.get(`https://singhpublication.in/api/product/products`, { params: { id: element } }).then((res) => {
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

    async function getitem()
    {
        setloading(true);
        let arr = [];
        let price = 0;
        await axios.get(`https://singhpublication.in/api/product/products`, { params: { id: location.state.product_id } }).then((res) => {
                arr.push(res.data);
                price += res.data.price;
            }
            ).catch((err) => {
                console.log(err);
                alert("error");
            }
            )
        setitems(arr);
        settotal_price(price);
        setloading(false);
    }

    useEffect(() => {
        // console.log(location.state.type);
        checkuser();
        // console.log(location.state);
        if(location.state.type=='regular')
            getitems();
        if(location.state.type=='shortcut')
            getitem();
        document.title = 'Singh Publication | Cart';
    }, []);

    return (
        <>
            {loading && <LoadingBar />}



            <div className="customer min-h-5/6 ">
                <div className="customers h-full p-[3vw] w-full flex justify-center  items-center text-[#315ED2] sm:text-white ">
                    <div class="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
                        <div class="flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                            <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                <div class="items-order flex flex-col justify-start items-start  px-4 py-4 md:py-6 md:p-6 xl:p-8 shadow-2xl w-full">
                                    <p class="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Items to be order</p>
                                    {items.map((item,key) => {
                                        return (
                                            <BookComp key={key} prod={item} couponstatus={location.state.couponstatus}  code={location.state.code} />
                                        );
                                    })}

                                </div>
                                <div class="flex justify-center flex-col xl:flex-row  items-stretch w-full space-y-4 md:space-y-0  xl:space-x-8 gap-6">
                                    <div class="summary flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full shadow-2xl space-y-6">
                                        <h3 class="text-xl  font-semibold leading-5 text-gray-800">Summary</h3>
                                        <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                            <div class="flex justify-between w-full">
                                                <p class="text-base  leading-4 text-gray-800">Subtotal</p>
                                                <p class="text-base  leading-4 text-gray-600">{location.state.totalAmount}</p>
                                            </div>
                                            <div class="flex justify-between items-center w-full">
                                                <p class="text-base  leading-4 text-gray-800">Discount <span class="bg-gray-200 p-1 text-xs font-medium text-gray-800 leading-3 ">STUDENT</span></p>
                                                <p class="text-base leading-4 text-gray-600">-$28.00 (50%)</p>
                                            </div>
                                            <div class="flex justify-between items-center w-full">
                                                <p class="text-base  leading-4 text-gray-800">Shipping</p>
                                                <p class="text-base leading-4 text-gray-600">$8.00</p>
                                            </div>
                                        </div>
                                        <div class="flex justify-between items-center w-full">
                                            <p class="text-base font-semibold leading-4 text-gray-800">Total</p>
                                            <p class="text-base font-semibold leading-4 text-gray-600">{location.state.totalAmount}</p>
                                        </div>
                                    </div>
                                    <div class="customer-details space-y-6 xl:hidden bg-[#315ED2] shadow-2xl w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                                        <h3 class="text-xl text-white font-semibold leading-5">Customer Details</h3>
                                        <div class="flex flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                            <div class="flex flex-col justify-start items-start flex-shrink-0">
                                                <div class=" text-center text-white space-x-4 py-4 border-y border-gray-200 w-full">
                                                    <p class="text-base text-center text-white font-semibold leading-4">{user.firstname} {user.lastname}</p>
                                                </div>
                                            </div>
                                            <div class="billing-shipping mt-5 w-full flex justify-center flex-wrap gap-5">
                                                <div class="flex justify-center flex-col xl:mt-8">
                                                    <p class="text-base text-white font-semibold leading-4">Shipping Address</p>

                                                    <p class="w-48 lg:w-full text-gray-300 xl:w-48  text-sm leading-5">
                                                        {user.shipping_address['house']==''?<p className='text-gray-300 xl:w-48  text-sm'>{location.state.house} {location.state.area} {location.state.street} {location.state.city} {location.state.pincode}</p>:<span></span>}
                                                        {user.shipping_address['house']}
                                                     {user.shipping_address['area']} {user.shipping_address['street']} {user.shipping_address['city']} {user.shipping_address['pincode']} </p>
                                                </div>
                                                <div class="flex justify-center flex-col xl:mt-8">
                                                    <p class="text-base text-white font-semibold leading-4">Billing Address</p>

                                                    <p class="w-48 lg:w-full text-gray-300 xl:w-48  text-sm leading-5">
                                                        {user.billing_address['house']==''?<p className='text-gray-300 xl:w-48  text-sm'>{location.state.house} {location.state.area} {location.state.street} {location.state.city} {location.state.pincode}</p>:<span></span>}
                                                        {user.billing_address['house']}
                                                     {user.billing_address['area']} {user.billing_address['street']} {user.billing_address['city']} {user.billing_address['pincode']} </p>
                                                </div>
                                                
                                                <div class="flex justify-center flex-col">
                                                    <p class="text-base text-white font-semibold leading-4">Order Delivery Address</p>
                                                    <p class="w-48 lg:w-full text-gray-300 xl:w-48  text-sm leading-5">{location.state.house} {location.state.area} {location.state.street} {location.state.city} {location.state.pincode}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="shipping flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full shadow-2xl space-y-6">
                                        <h3 class="text-xl  font-semibold leading-5 text-gray-800">Shipping</h3>
                                        <div class="flex justify-between items-start w-full">
                                            <div class="flex justify-center items-center space-x-4">
                                                <div class="w-8 h-8">
                                                    <img src={playstore} className="w-1/2 mx-auto" alt="..."></img>
                                                </div>
                                                <div class="flex flex-col justify-start items-center">
                                                    <p class="text-lg leading-6  font-semibold text-gray-800">DPD Delivery<br /><span class="font-normal">Delivery with 24 Hours</span></p>
                                                </div>
                                            </div>
                                            <p class="text-lg font-semibold leading-6  text-gray-800">$8.00</p>
                                        </div>
                                        <div class="w-full flex justify-center items-center">
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                setloading(true);
                                                axios.post("https://singhpublication.in/api/order/createorder", {
                                                    "ProductsArray": user.cart,
                                                    "totalAmount": location.state.totalAmount,
                                                    "ordered_by": user.email,
                                                    "delivery_status": "pending",
                                                    "delivery_address": location.state.house + ' ' + location.state.street + ' ' + location.state.area + ' ' + location.state.city + ' ' + location.state.pincode,
                                                    "billing_address":user.billing_address['house']==''? location.state.house + ' ' + location.state.street + ' ' + location.state.area + ' ' + location.state.city + ' ' + location.state.pincode:user.billing_address['house'] + ' ' + user.billing_address['street'] + ' ' + user.billing_address['area'] + ' ' + user.billing_address['city'] + ' ' + user.billing_address['pincode'],
                                                    "invoice_file": ""

                                                }, {
                                                    headers: {
                                                        'Authorization': `Bearer ${user.accessToken}`
                                                    },
                                                    params: {
                                                        'id': user.id
                                                    }
                                                },).then((res) => {
                                                    // let newuser=res.data;
                                                    // newuser['accessToken']=user.accessToken;
                                                    // localStorage.setItem('pubuser', JSON.stringify(newuser));
                                                    // setuser(newuser);
                                                    setloading(false);
                                                    console.log(res.data);
                                                    let newuser = res.data;
                                                    newuser['accessToken'] = user.accessToken;
                                                    localStorage.setItem('pubuser', JSON.stringify(newuser));
                                                    navigate('/orderplaced');
                                                    // navigate('/accountsetting');
                                                    // localStorage.setItem('pubuser', JSON.stringify(res.data));
                                                }
                                                ).catch((err) => {
                                                    setloading(false);
                                                    alert("error");
                                                    console.log(err);
                                                }
                                                )
                                                if(location.state.urlcode!='IZ4376')
                                               {
                                                axios.post("https://singhpublication.in/api/deletecoupon",{
                                                    coupon:location.state.urlcode
                                                }).then((res)=>{
                                                    console.log(res);
                                                }
                                                ).catch((err)=>{
                                                    console.log(err);
                                                }
                                                )
                                               }
                                            }} className="w-full px-2 text-sm sm:text-lg sm:px-8 py-3 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full">Place order</button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div class="customer-details bg-[#315ED2] shadow-2xl w-full xl:w-96 hidden xl:flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                                <h3 class="text-xl text-white font-semibold leading-5">Customer Details</h3>
                                <div class="flex flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                    <div class="flex flex-col justify-start items-start flex-shrink-0">
                                        <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                            <img src={playstore} className="w-1/2 mx-auto" alt="..."></img>

                                        </div>

                                        <div class=" text-center text-white space-x-4 py-4 border-b border-gray-200 w-full">
                                            <p class="text-base text-center text-white font-semibold leading-4">{user.firstname} {user.lastname}</p>
                                        </div>
                                    </div>
                                    <div class="billing-shipping mt-5 w-full flex justify-center flex-wrap gap-5">
                                        <div class="flex justify-center flex-col xl:mt-8">
                                            <p class="text-base text-white font-semibold leading-4">Shipping Address</p>
                                            {user.shipping_address['house']==''?<p className='text-gray-300 xl:w-48  text-sm'>N/A</p>:<span></span>}
                                            <p class="w-48 lg:w-full text-gray-300 xl:w-48  text-sm leading-5">{user.shipping_address['house']} {user.shipping_address['area']} {user.shipping_address['street']} {user.shipping_address['city']} {user.shipping_address['pincode']} </p>
                                        </div>
                                        <div class="flex justify-center flex-col">
                                            <p class="text-base text-white font-semibold leading-4">Billing Address</p>
                                            {user.billing_address['house']==''?<p className='text-gray-300 xl:w-48  text-sm'>N/A</p>:<span></span>}
                                            <p class="w-48 lg:w-full text-gray-300 xl:w-48  text-sm leading-5">{user.billing_address['house']} {user.billing_address['area']} {user.billing_address['street']} {user.billing_address['city']} {user.billing_address['pincode']}</p>
                                        </div>
                                        <div class="flex justify-center flex-col">
                                            <p class="text-base text-white font-semibold leading-4">Order Delivery Address</p>
                                            <p class="w-48 lg:w-full text-gray-300 xl:w-48  text-sm leading-5">{location.state.house} {location.state.area} {location.state.street} {location.state.city} {location.state.pincode}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    );
}
export default Customers;