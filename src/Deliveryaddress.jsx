import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function Deliveryaddress() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    const [house, sethouse] = useState(user.shipping_address.house);
    const [street, setstreet] = useState(user.shipping_address.street);
    const [area, setarea] = useState(user.shipping_address.area);
    const [city, setcity] = useState(user.shipping_address.city);
    const [pincode, setpincode] = useState(user.shipping_address.pincode);
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            }

        });
    }
    useEffect(() => {
        checkuser();
        document.title = 'Singh Publication | Delivery Address';
    },[]);
    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center
            ">
                <div className="w-4/5 h-max bg-white flex flex-col items-center justify-center rounded-lg
            " style={{ 'border': '1px solid #777777' }}>
                    <h1 className="text-2xl font-medium mt-5 mb-5" style={{ 'color': '#315ED2' }}>Delivery Address</h1>
                    <input value={house} onChange={(e)=>{
                        e.preventDefault();
                        sethouse(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="text"
                        placeholder="House/Plot No."
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    />
                    <input value={street} onChange={(e)=>{
                        e.preventDefault();
                        setstreet(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="text"
                        placeholder="Street/Landmark"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    /><input value={area} onChange={(e)=>{
                        e.preventDefault();
                        setarea(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="text"
                        placeholder="Area"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    /><input value={city} onChange={(e)=>{
                        e.preventDefault();
                        setcity(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="text"
                        placeholder="City"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    /><input value={pincode} onChange={(e)=>{
                        e.preventDefault();
                        setpincode(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="number"
                        placeholder="Pincode"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    />
                    <button className=" text-white px-12 py-2 mt-5 mb-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }} onClick={(e) => {
                            // console.log(user.accessToken);
                            e.preventDefault();
                            axios.post("https://singh-publication.onrender.com/api/order/createorder", {


                                "ProductsArray": user.cart,
                                "totalAmount": location.state.totalAmount,
                                "ordered_by": user.email,
                                "delivery_status": "pending",
                                "invoice_file":""

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
                                console.log(res.data);
                                navigate('/orderplaced');
                                // navigate('/accountsetting');
                                // localStorage.setItem('pubuser', JSON.stringify(res.data));
                            }
                            ).catch((err) => {
                                alert("error");
                                console.log(err);
                            }
                            )

                        }}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}
export default Deliveryaddress;