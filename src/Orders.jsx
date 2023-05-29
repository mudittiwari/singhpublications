import React from 'react';
import sample from './assets/sample.png';
import book from './assets/book.png';
import star from './assets/star.png';
import app from './Firebase';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import LoadingBar from './comps/Loadingbar';
function BookComp(props) {
    const navigate = useNavigate();
    return (
        <div className=' my-4 mx-2 h-36 rounded-xl p-2 relative flex items-center' style={{ 'border': '1px solid #315ED2', 'width': '370px' }} >
            <div className='flex flex-col overflow-y-scroll' style={{ 'width': '800px', 'height': '120px' }}>
            {props.order.items.map((item,index) => {
                return <div key={index} className='flex my-2'>
                <img src={book} className="w-20 h-full " alt="" />
                <div className='ml-2 mr-5'>
                    <h1 className="text-md font-bold mb-0 mx-0 mt-0" style={{ 'color': '#315ED2' }}>{item.title}</h1>

                    <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{item.subtitle}</h1>
                    <div className='w-max mt-1 ml-0 flex items-center'>
                        <h1 className="text-base font-medium mb-0 mr-1  w-max mt-0" style={{ 'color': '#777777' }}>{item.rating}</h1>
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                    </div>
                    <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>11 Jan 2023</h1>
                </div>
            </div>
            })}

                
                
            </div>
            
            <div className='h-full w-full justify-center flex flex-col items-center'>
                <h1 className="text-2xl font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2' }}>{props.order.price} Rs.</h1>
                <button onClick={(e)=>{
                    e.preventDefault();
                    navigate('/orderdetails',{state:{order:props.order}})
                }} className=" text-white px-4 py-1 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                    Details
                </button>
            </div>
        </div>
    );
}



function Orders() {
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    const [orders, setorders] = useState([]);
    const [loading, setloading] = useState(true);
    const [total_price, settotal_price] = useState(0);
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
        let price = 0;
        await axios.get(`https://singhpublications.onrender.com/api/order/getuserorders`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }, params: { id: user.id }
        }).then(async (res) => {
            for (let i = 0; i < res.data.length; i++) {
                let arr = [];
                for (let j = 0; j < res.data[i].ProductsArray.length; j++) {
                    await axios.get(`https://singhpublications.onrender.com/api/product/products`, { params: { id: res.data[i].ProductsArray[j] } }).then((res) => {
                        arr.push(res.data);
                    }
                    ).catch((err) => {
                        console.log(err);
                    }
                    )
                }

                ordrs.push({ 'items': arr, 'price': res.data[i].totalAmount,'status':res.data[i].delivery_status });
            }

        }
        ).catch((err) => {
            alert("error");
            console.log(err);
        }
        )
        setloading(false);
        setorders(ordrs);
    }
    useEffect(() => {
        checkuser();
        getitems();
        document.title = 'Singh Publication | Orders';
    }, []);
    return (
        <>
        {loading && <LoadingBar/>}
            <div className='w-full flex justify-center'>
                <div className='w-4/5  flex justify-center flex-col items-center flex-wrap' >
                    <h1 className="text-2xl w-max font-medium mb-5 mt-5" style={{ 'color': '#315ED2' }}>Orders</h1>
                    <div className='w-full flex justify-around flex-wrap'>
                       {orders.length==0?<h1 className="text-2xl font-medium mb-5 mt-5" style={{ 'color': 'gray' }}>No Orders Placed Till Now</h1> :orders.map((item, index) => {
                            return (
                                <BookComp key={index} order={item} />
                            )
                        })}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Orders;