import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app from './Firebase';
function ShippingAddress() {
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
    },[]);
    return (
        <>
            <div className="w-screen h-max py-8 flex items-center justify-center
            ">
                <div className="w-4/5 h-max bg-white flex flex-col items-center justify-center rounded-lg
            " style={{ 'border': '1px solid #777777' }}>
                    <h1 className="text-2xl font-medium mt-5 mb-5" style={{ 'color': '#315ED2' }}>Shipping Address</h1>
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
                            axios.post("https://singh-publication.onrender.com/api/user/updateshippingaddress", {


                                "house": house,
                                "street": street,
                                "area": area,
                                "city": city,
                                "pincode": pincode

                            }, {
                                headers: {
                                    'Authorization': `Bearer ${user.accessToken}`
                                },
                                params: {
                                    'id': user.id
                                }
                            },).then((res) => {
                                let newuser=res.data;
                                newuser['accessToken']=user.accessToken;
                                localStorage.setItem('pubuser', JSON.stringify(newuser));
                                setuser(newuser);
                                console.log(res.data);
                                navigate('/accountsetting');
                                // localStorage.setItem('pubuser', JSON.stringify(res.data));
                            }
                            ).catch((err) => {
                                console.log(err);
                                alert("error");
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
export default ShippingAddress;