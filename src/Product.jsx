import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import star from './assets/star.png';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            }

        });
    }
    useEffect(() => {
        if(localStorage.getItem('pubuser')===null)
        {
            setuser(null);
        }
        else
        {
            setuser(JSON.parse(localStorage.getItem('pubuser')));
        }
        document.title = 'Singh Publication | Book';
    }, []);
    return (
        <>
            <div className="w-full flex md:flex-row flex-col mt-10">
                <div className="w-full md:w-1/3 flex flex-col p-8" style={{ 'borderRight': '1px solid #777777' }}>
                    <img className="w-80" src={location.state.image_url} alt="" />
                    <h1 className="text-md font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2', 'maxWidth': '100%' }}>{location.state.title}</h1>
                    <h1 className="text-base font-semibold mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{location.state.category}</h1>
                    <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{location.state.subtitle}</h1>
                    <div className='w-full mt-1 mx-0 flex items-center'>
                        <h1 className="text-base font-medium mb-0 mr-2  w-max mt-0" style={{ 'color': '#777777' }}>{location.state.rating}</h1>
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                        <img className='mx-1 w-4' src={star} alt="" />
                    </div>
                    {user === null ? <h1></h1>:
                    <div className="flex justify-around">
                        <button onClick={(e) => {
                            // console.log(user.accessToken);
                            e.preventDefault();
                            axios.post("https://singh-publication.onrender.com/api/user/addtocart", {


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
                                let newuser = res.data;
                                newuser['accessToken'] = user.accessToken;
                                localStorage.setItem('pubuser', JSON.stringify(newuser));
                                setuser(newuser);
                                alert("Added to cart");
                                // localStorage.setItem('pubuser', JSON.stringify(res.data));
                            }
                            ).catch((err) => {
                                console.log(err);
                                if (err.response.status === 400) {
                                    alert("Product already in cart");
                                }
                            }
                            )

                        }} className=" text-white px-6 py-2 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                            Add to Cart
                        </button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            axios.post("https://singh-publication.onrender.com/api/user/addtowishlist", {


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
                                let newuser = res.data;
                                newuser['accessToken'] = user.accessToken;
                                localStorage.setItem('pubuser', JSON.stringify(newuser));
                                setuser(newuser);
                                alert("Added to wishlist");
                            }
                            ).catch((err) => {
                                console.log(err);
                                if (err.response.status === 400) {
                                    alert("Product already in wishlist");
                                }
                            }
                            )

                        }} className=" text-white px-6 py-2 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                            Add to Wishlist
                        </button>
                    </div>}
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-start p-8">
                    <h1 className="text-2xl font-medium mb-3" style={{ 'color': '#315ED2' }}>Book Description</h1>
                    <h1>{location.state.description}</h1>
                    <h1 className="text-2xl font-medium mb-3 mt-5" style={{ 'color': '#315ED2' }}>Book Description</h1>
                    <div className="flex">
                        <div className="w-1/2">
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Author: <span className="font-normal"> {location.state.author}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Publisher: <span className="font-normal">{location.state.publisher}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Language: <span className="font-normal">{location.state.language}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Paperback: <span className="font-normal">{location.state.paperback}</span></h1>

                        </div>
                        <div className="w-1/2">
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">ISBN-10: <span className="font-normal">{location.state.isbn}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">ISBN-13: <span className="font-normal">{location.state.isbn13}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Reading Age: <span className="font-normal">{location.state.age}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Item Weight: <span className="font-normal">{location.state.weight}</span></h1>
                            <h1 className="text-base font-medium mb-0 mx-0 w-max mt-0">Dimensions: <span className="font-normal">{location.state.dimensions}</span></h1>

                        </div>
                    </div>
                    <h1 className="text-2xl font-medium mb-3 mt-10" style={{ 'color': '#315ED2' }}>Customer Reviews</h1>
                </div>
            </div>
        </>
    );
}

export default Product;