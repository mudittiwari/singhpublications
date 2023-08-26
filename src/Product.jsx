import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import star from './assets/star.png';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
import LoadingBar from "./comps/Loadingbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const [review, setreview] = useState("");
    const [rating, setrating] = useState(0);
    const [loading, setloading] = React.useState(false);
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    async function checkuser() {
        if (localStorage.getItem('pubuser') === null) {
            navigate('/login');
        }
    }

    function checkuserorder() {
        if (user != null) {
            // console.log(user.orders);
            for (let i = 0; i < user.orders.length; i++) {
                if (user.orders[i].ProductsArray.includes(location.state.id)) {
                    return 1;
                }

            }
            return 0;
        }
        return 0;
    }
    async function addreview() {
        axios.post("https://singhpublication.in/api/user/addreview", {
            id: location.state.id,
            review: review,
            username: user.firstname+" "+user.lastname,
            rating: rating

        }, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then((res) => {
            console.log(res);
            location.state=res.data;
            setrating(0);
            setreview("");
            console.log(location.state);
        }).catch((err) => {console.log(err)});
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('pubuser') === null) {
            setuser(null);
        }
        else {
            setuser(JSON.parse(localStorage.getItem('pubuser')));
        }
        
        document.title = 'Singh Publication | Book';
    }, []);
    return (
        <>
            {loading && <LoadingBar />}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10">
                <div className="w-full flex flex-col items-center p-8" style={{ 'borderRight': '1px solid #777777' }}>
                    <div>
                        <img className="w-80" src={location.state.image_url} alt="" />
                        <h1 className="text-md font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2', 'maxWidth': '100%' }}>{location.state.title}</h1>
                        <h1 className="text-base font-semibold mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{location.state.category}</h1>
                        <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{location.state.subtitle}</h1>
                        <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>Price: {location.state.price} Rs.</h1>
                        <div className="star-whishlist flex justify-between">
                            <div className='w-full mt-1 flex items-center'>
                                <h1 className="text-base font-medium mb-0 mr-2  w-max mt-0" style={{ 'color': '#777777' }}>{location.state.rating}</h1>
                                <img className='mx-1 w-4' src={star} alt="" />
                                <img className='mx-1 w-4' src={star} alt="" />
                                <img className='mx-1 w-4' src={star} alt="" />
                                <img className='mx-1 w-4' src={star} alt="" />
                                <img className='mx-1 w-4' src={star} alt="" />
                            </div>
                            {user != null && user.wishlist.includes(location.state.id) ?
                                <button type="button" onClick={(e) => {
                                    toast.info("Product already in wishlist");
                                }} className="w-16 h-full flex justify-center items-center px-4 py-4 bg-white border border-[#777777] text-[red] text-2xl rounded-[50%]" ><i className="fa-solid fa-heart"></i></button> : <button type="button" onClick={(e) => {
                                    let user = JSON.parse(localStorage.getItem('pubuser'));
                                    e.preventDefault();
                                    if (user) {

                                        axios.post("https://singhpublication.in/api/user/addtowishlist", {


                                            "product_id": location.state.id,

                                        }, {
                                            headers: {
                                                'Authorization': `Bearer ${user.accessToken}`
                                            },
                                            params: {
                                                'id': user.id
                                            }
                                        },).then((res) => {
                                            let newuser = res.data;
                                            newuser['accessToken'] = user.accessToken;
                                            localStorage.setItem('pubuser', JSON.stringify(newuser));
                                            window.location.reload(false)
                                            toast.info("Added to wishlist");
                                        }
                                        ).catch((err) => {
                                            console.log(err);
                                            if (err.response.status === 400) {
                                                toast.info("Product already in wishlist");
                                            }

                                        }
                                        )
                                        navigate('/wishlist')
                                    }
                                    else {
                                        navigate('/login');
                                    }
                                }} className="w-16 h-full flex justify-center items-center px-4 py-4 bg-white border border-[#777777] rounded-[50%] text-[#777777] text-2xl"><i className="fa-regular fa-heart"></i></button>
                            }
                        </div>

                    </div>

                    <div className="flex my-10 flex-wrap justify-center gap-5 w-full">
                        {user != null && user.cart.includes(location.state.id) ? <button onClick={(e) => {
                            if (user === null) {
                                navigate('/login');
                                return;
                            }
                            // console.log(user.accessToken);
                            e.preventDefault();
                            setloading(true);
                            axios.post("https://singhpublication.in/api/user/addtocart", {


                                "product_id": location.state.id,

                                //how to pass query params and headers in axios

                            }, {
                                headers: {
                                    'Authorization': `Bearer ${user.accessToken}`
                                },
                                params: {
                                    'id': user.id
                                }
                            },).then((res) => {
                                setloading(false);
                                let newuser = res.data;
                                newuser['accessToken'] = user.accessToken;
                                localStorage.setItem('pubuser', JSON.stringify(newuser));
                                setuser(newuser);
                                window.location.reload(false)
                                toast.info("Added to cart");
                                // localStorage.setItem('pubuser', JSON.stringify(res.data));
                            }
                            ).catch((err) => {
                                setloading(false);
                                console.log(err);
                                if (err.response.status === 400) {
                                    toast.info("Product already in cart");
                                }
                            }
                            )

                        }} className="w-fit px-10 py-2 border-2 border-[#808080] hover:bg-[#808080] hover:text-white text-[#808080] rounded-full" >
                            Added to Cart
                        </button> :
                            <button onClick={(e) => {
                                if (user === null) {
                                    navigate('/login');
                                    return;
                                }
                                // console.log(user.accessToken);
                                e.preventDefault();
                                setloading(true);
                                axios.post("https://singhpublication.in/api/user/addtocart", {


                                    "product_id": location.state.id,

                                    //how to pass query params and headers in axios

                                }, {
                                    headers: {
                                        'Authorization': `Bearer ${user.accessToken}`
                                    },
                                    params: {
                                        'id': user.id
                                    }
                                },).then((res) => {
                                    setloading(false);
                                    let newuser = res.data;
                                    newuser['accessToken'] = user.accessToken;
                                    localStorage.setItem('pubuser', JSON.stringify(newuser));
                                    setuser(newuser);
                                    toast.info("Added to cart");
                                    // localStorage.setItem('pubuser', JSON.stringify(res.data));
                                }
                                ).catch((err) => {
                                    setloading(false);
                                    console.log(err);
                                    if (err.response.status === 400) {
                                        toast.info("Product already in cart");
                                    }
                                }
                                )

                            }} className=" w-fit px-10 py-2 border-2 border-[#808080] text-[#808080] hover:bg-[#808080] hover:text-white rounded-full">
                                Add to Cart
                            </button>
                        }
                        <button onClick={(e) => {
                            if (user === null) {
                                navigate('/login');
                                return;
                            }
                            // console.log(user.accessToken);
                            e.preventDefault();
                            navigate('/deliveryaddress', { state: { product_id: location.state.id, type: "shortcut", "totalAmount": location.state.price } })
                            // setloading(true);
                            // axios.post("https://singhpublication.in/api/user/addtocart", {


                            //     "product_id": location.state.id,

                            //     //how to pass query params and headers in axios

                            // }, {
                            //     headers: {
                            //         'Authorization': `Bearer ${user.accessToken}`
                            //     },
                            //     params: {
                            //         'id': user.id
                            //     }
                            // },).then((res) => {
                            //     setloading(false);
                            //     let newuser = res.data;
                            //     newuser['accessToken'] = user.accessToken;
                            //     localStorage.setItem('pubuser', JSON.stringify(newuser));
                            //     setuser(newuser);
                            //     navigate('/cart');
                            //     // localStorage.setItem('pubuser', JSON.stringify(res.data));
                            // }
                            // ).catch((err) => {
                            //     setloading(false);
                            //     console.log(err);
                            //     if (err.response.status === 400) {
                            //         navigate('/cart');
                            //     }
                            // }
                            // )

                        }} className="w-fit px-10 uppercase py-2 border-2 border-[#315ED2] text-[#315ED2] hover:text-white hover:bg-[#315ED2] rounded-full">
                            Buy Now
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:col-span-3 justify-start p-8">
                    <h1 className="text-2xl font-medium mb-3" style={{ 'color': '#315ED2' }}>Book Description</h1>
                    <h1 className="text-justify">{location.state.description}</h1>
                    <h1 className="text-2xl font-medium mb-3 mt-5" style={{ 'color': '#315ED2' }}>Book Description</h1>
                    <div className="flex flex-wrap w-1/2 justify-between gap-5">
                        <div className="">
                            <h1 className="text-base font-medium mb-0 mx-0 mt-0">Author: <span className="font-normal"> {location.state.author}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 mt-0">Publisher: <span className="font-normal">{location.state.publisher}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0  mt-0">Language: <span className="font-normal">{location.state.language}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 mt-0">Paperback: <span className="font-normal">{location.state.paperback}</span></h1>

                        </div>
                        <div className="">
                            <h1 className="text-base font-medium mb-0 mx-0  mt-0">ISBN-10: <span className="font-normal">{location.state.isbn}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 mt-0">ISBN-13: <span className="font-normal">{location.state.isbn13}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0  mt-0">Reading Age: <span className="font-normal">{location.state.age}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0  mt-0">Item Weight: <span className="font-normal">{location.state.weight}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 mt-0">Dimensions: <span className="font-normal">{location.state.dimensions}</span></h1>

                        </div>

                    </div>
                    <h1 className="text-2xl font-medium mb-3 mt-10" style={{ 'color': '#315ED2' }}>Customer Reviews</h1>
                    {location.state.reviews.length == 0 && <h1 className="text-lg font-semibold ml-0" style={{ 'color': '#315ED2' }}>No Reviews</h1>}
                    {location.state.reviews.map((review, index) => {
                        return <div key={index}>
                            <h1 className="text-lg font-semibold ml-3" style={{ 'color': '#315ED2' }}>{review.username}</h1>
                            <h1 className="text-lg font-semibold ml-3" >{review.review}</h1>
                        </div>
                    })}
                    {checkuserorder() == 1 &&
                        <div className="w-full flex flex-col items-center mt-10">
                            <h1 className="text-lg font-semibold ml-3" style={{ 'color': '#315ED2' }}>Add Review</h1>
                            <textarea value={review} onChange={(e)=>{
                                setreview(e.target.value);
                            }} className="mt-4 rounded-3xl p-4 focus:outline-none resize-none w-full max-w-xl" style={{ 'border': '1px solid #777777' }} name="" id="" cols="20" rows="5" placeholder="Review"></textarea>
                            <div className=' mt-4 w-full flex justify-center items-center mx-auto'>
                                <img onClick={()=>{setrating(1)}} className='mx-1 w-8 cursor-pointer' src={star} alt="" />
                                <img onClick={()=>{setrating(2)}} className='mx-1 w-8 cursor-pointer' src={star} alt="" />
                                <img onClick={()=>{setrating(3)}} className='mx-1 w-8 cursor-pointer' src={star} alt="" />
                                <img onClick={()=>{setrating(4)}} className='mx-1 w-8 cursor-pointer' src={star} alt="" />
                                <img onClick={()=>{setrating(5)}} className='mx-1 w-8 cursor-pointer' src={star} alt="" />
                            </div>
                            <button className="btn mt-5 cursor-pointer w-fit px-14 py-4 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full" onClick={(e) => {
                                e.preventDefault();
                                addreview();
                            }}>
                                Submit
                            </button>
                        </div>}
                </div>
            </div>
        </>
    );
}

export default Product;