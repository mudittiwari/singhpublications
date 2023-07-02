import { useEffect } from "react";
import React from "react";
import LoadingBar from "./comps/Loadingbar";
import star from './assets/star.png';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function BookComp(props) {
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    return (
        <div className=' my-4 max-w-md rounded-xl p-5' style={{ 'border': '1px solid #777777' }} >
            <div className="img-content cursor-pointer" onClick={(e) => {
                e.preventDefault();
                navigate('/product', { state: props.prod })
            }}>
                <img src={props.prod.image_url} className="w-1/2 py-5 mx-auto rounded-xl" alt="" />
                <h2 className="text-lg text-[#315ED2]  font-bold" >{props.prod.title}</h2>
                <h2 className="text-base text-[#777777] font-semibold" >{props.prod.category}</h2>
                <h2 className="text-sm text-[#777777]  font-medium">{props.prod.subtitle}</h2>
                <div className='w-full mt-1 flex items-center'>
                    <h1 className="text-base font-medium mr-2" style={{ 'color': '#777777' }}>{props.prod.rating}</h1>
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                    <img className='mx-1 w-4' src={star} alt="" />
                </div>
            </div>

            <div className="flex justify-between mt-2 gap-5">
                <button type="button" className="w-full px-5 py-4 bg-white border border-[#777777] text-[#777777] font-bold rounded-l-xl" onClick={(e) => {
                    let user = JSON.parse(localStorage.getItem('pubuser'));
                    if (user === null) {
                        navigate('/login');
                        return;
                    }
                    // console.log(user.accessToken);
                    e.preventDefault();
                    props.setLoading(true);
                    axios.post("https://singhpublication.in/api/user/addtocart", {


                        "product_id": props.prod.id,

                        //how to pass query params and headers in axios

                    }, {
                        headers: {
                            'Authorization': `Bearer ${user.accessToken}`
                        },
                        params: {
                            'id': user.id
                        }
                    },).then((res) => {
                        console.log(res);
                        props.setLoading(false);
                        let newuser = res.data;
                        newuser['accessToken'] = user.accessToken;
                        localStorage.setItem('pubuser', JSON.stringify(newuser));
                        toast.info("Added to cart");
                        setuser(newuser);
                        // window.location.reload(false)
                        // localStorage.setItem('pubuser', JSON.stringify(res.data));
                    }
                    ).catch((err) => {
                        props.setLoading(false);
                        console.log(err.response.status);
                        if (err.response.data === "product already in cart") {
                            toast.info("Product already in cart");
                        }
                    }
                    )

                }}>
                    {user != null && user.cart.includes(props.prod.id) ?
                        "Added to Cart" : "Add to Cart"
                    }
                </button>
                {user != null && user.wishlist.includes(props.prod.id) ?
                    <button type="button" onClick={(e) => {
                        toast.info("Product already in wishlist");
                    }} className="w-16 h-full flex justify-center items-center px-4 py-4 bg-white border border-[#777777] text-[red]  rounded-r-xl text-2xl"><i className="fa-solid fa-heart"></i></button> : <button type="button" onClick={(e) => {
                        let user = JSON.parse(localStorage.getItem('pubuser'));
                        e.preventDefault();
                        if (user) {

                            axios.post("https://singhpublication.in/api/user/addtowishlist", {


                                "product_id": props.prod.id,

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

                            }
                            ).catch((err) => {
                                console.log(err);
                                if (err.response.status === 400) {
                                    toast.info("Product already in wishlist");
                                }

                            }
                            )
                            // navigate('/wishlist')
                        }
                        else {
                            navigate('/login');
                        }
                    }} className="w-16 h-full flex justify-center items-center px-5 py-5 bg-white border border-[#777777] text-[#777777] rounded-r-xl  text-2xl"><i className="fa-regular fa-heart"></i></button>
                }

            </div>


            {/* {props.user != null && props.user.wishlist.includes(props.prod.id) && <div onClick={(e) => {
                let user = JSON.parse(localStorage.getItem('pubuser'));
                e.preventDefault();
                if (user) {

                    axios.post("https://singhpublication.in/api/user/addtowishlist", {


                        "product_id": props.prod.id,

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
                        toast.info("Added to wishlist");
                    }
                    ).catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                            toast.info("Product already in wishlist");
                        }

                    }
                    )
                }
                else {
                    toast.warning("Please login to add to wishlist");
                }
            }} >
            </div>} */}
        </div>
    );
}

function Books()
{
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    async function getallprods() {
        setLoading(true);
        axios.get('https://singhpublication.in/api/product/getproducts').then((res) => {
            // console.log(res);
            setLoading(false);
            setProducts(res.data);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert("error");
            return;
        });
    }
    useEffect(() => {
        getallprods();
        document.title = 'Singh Publication | Books';
    }, []);
    return (
        <>
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
            {loading && <LoadingBar />}
            <h1 className="text-5xl font-medium text-center mt-5 mb-5">Books</h1>
            <div className='w-full flex md:px-0 px-3 mx-auto flex-wrap gap-10 justify-center sm:mb-10'>
                    {/* <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp /> */}
                    {products.map((prod, index) => {
                        return <BookComp key={index} prod={prod} user={user} setLoading={setLoading} />
                    })}

                </div>
        </>
    );

}

export default Books;