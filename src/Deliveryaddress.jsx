import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import playstore from './assets/undraw_delivery_address_re_cjca.svg';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import app from './Firebase';
import LoadingBar from "./comps/Loadingbar";
function Modal(props) {
    const location = useLocation();
    return (
        <>

            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}

                                {/*body*/}
                                <div className="relative pt-6 px-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Do you want to update your shipping address?
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-5">
                                    <button
                                        className=" className= w-fit px-8 py-2 bg-white border-2 border-[#315ED2] text-[#315ED2] hover:text-white  hover:bg-[#315ED2] rounded-full"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.setShowModal(false);
                                            props.orderwithoutshippingaddress();
                                        }}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="  className= w-fit px-8 py-2 bg-white border-2 border-[#315ED2] text-white rounded-full"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.changeshippingaddress();
                                            props.setShowModal(false);
                                        }}
                                        style={{ 'backgroundColor': "#315ED2" }}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
function Modal1(props) {
    const location = useLocation();
    return (
        <>

            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}

                                {/*body*/}
                                <div className="relative pt-6 px-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Do you want to update your Billing address?
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-5">
                                    <button
                                        className=" className= w-fit px-8 py-2 bg-white border-2 border-[#315ED2] text-[#315ED2] hover:text-white  hover:bg-[#315ED2] rounded-full"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.setShowModal(false);
                                            props.orderwithoutshippingaddress();
                                        }}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="  className= w-fit px-8 py-2 bg-white border-2 border-[#315ED2] text-white rounded-full"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.changebillingaddress();
                                            props.setShowModal(false);
                                        }}
                                        style={{ 'backgroundColor': "#315ED2" }}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
function Modal2(props) {
    const location = useLocation();
    return (
        <>

            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}

                                {/*body*/}
                                <div className="relative pt-6 px-6 flex-auto">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Do you want to update your Billing address and shipping address?
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-5">
                                    <button
                                        className=" className= w-fit px-8 py-2 bg-white border-2 border-[#315ED2] text-[#315ED2] hover:text-white  hover:bg-[#315ED2] rounded-full"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.setShowModal(false);
                                            props.orderwithoutshippingaddress();
                                        }}
                                    >
                                        No
                                    </button>
                                    <button
                                        className="  className= w-fit px-8 py-2 bg-white border-2 border-[#315ED2] text-white rounded-full"
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.changebillingaddress();
                                            props.changeshippingaddress();
                                            props.setShowModal(false);
                                        }}
                                        style={{ 'backgroundColor': "#315ED2" }}
                                    >
                                        Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
function Deliveryaddress() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('pubuser')));
    const [house, sethouse] = useState(user.shipping_address.house == null ? '' : user.shipping_address.house);
    const [street, setstreet] = useState(user.shipping_address.street == null ? '' : user.shipping_address.street);
    const [area, setarea] = useState(user.shipping_address.area == null ? '' : user.shipping_address.area);
    const [city, setcity] = useState(user.shipping_address.city == null ? '' : user.shipping_address.city);
    const [pincode, setpincode] = useState(user.shipping_address.pincode == null ? '' : user.shipping_address.pincode);
    const [showModal, setShowModal] = React.useState(false);
    const [showModal2, setShowModal2] = React.useState(false);
    const [showModal1, setShowModal1] = React.useState(false);
    const [loading, setloading] = useState(false);
    async function checkuser() {
        if (localStorage.getItem('pubuser') === null) {
            navigate('/login');
        }
    }
    async function changeshippingaddress() {
        setloading(true);
        // console.log("mudit tiwari");
        // e.preventDefault();
        axios.post("https://singhpublication.in/api/user/updateshippingaddress", {
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
            setloading(false);
            let newuser = res.data;
            newuser['accessToken'] = user.accessToken;
            localStorage.setItem('pubuser', JSON.stringify(newuser));
            setuser(newuser);
            if (location.state.type == 'regular')
                navigate('/customers', { state: { "totalAmount": location.state.totalAmount, 'type': 'regular', house, area, street, city, pincode, code: location.state.code,urlcode:location.state.urlcode,couponstatus:location.state.couponstatus } })
            else if (location.state.type == 'shortcut')
                navigate('/customers', { state: { "totalAmount": location.state.totalAmount, product_id: location.state.product_id, 'type': 'regular', house, area, street, city, pincode } })
            // localStorage.setItem('pubuser', JSON.stringify(res.data));
        }
        ).catch((err) => {
            setloading(false);
            console.log(err);
            alert("error");
        }
        )
    }
    async function changebillingaddress() {
        setloading(true);
        // console.log("mudit tiwari");
        // e.preventDefault();
        axios.post("https://singhpublication.in/api/user/updatebillingaddress", {
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
            setloading(false);
            let newuser = res.data;
            newuser['accessToken'] = user.accessToken;
            localStorage.setItem('pubuser', JSON.stringify(newuser));
            setuser(newuser);
            if (location.state.type == 'regular')
                navigate('/customers', { state: { "totalAmount": location.state.totalAmount, 'type': 'regular', house, area, street, city, pincode, code: location.state.code,urlcode:location.state.urlcode,couponstatus:location.state.couponstatus } })
            else if (location.state.type == 'shortcut')
                navigate('/customers', { state: { "totalAmount": location.state.totalAmount, product_id: location.state.product_id, 'type': 'regular', house, area, street, city, pincode } })
            // localStorage.setItem('pubuser', JSON.stringify(res.data));
        }
        ).catch((err) => {
            setloading(false);
            console.log(err);
            alert("error");
        }
        )
    }
    async function orderwithoutshippingaddress() {
        console.log(location.state.type);
        if (location.state.type == 'regular')
            navigate('/customers', { state: { "totalAmount": location.state.totalAmount, 'type': 'regular', house, area, street, city, pincode, code: location.state.code,urlcode:location.state.urlcode,couponstatus:location.state.couponstatus } })
        else if (location.state.type == 'shortcut')
            navigate('/customers', { state: { "totalAmount": location.state.totalAmount, product_id: location.state.product_id, 'type': 'shortcut', house, area, street, city, pincode } })
    }
    useEffect(() => {
        checkuser();
        document.title = 'Singh Publication | Delivery Address';
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
            <Modal showModal={showModal} setShowModal={setShowModal} changeshippingaddress={changeshippingaddress} orderwithoutshippingaddress={orderwithoutshippingaddress} />
            <Modal1 showModal={showModal1} setShowModal={setShowModal1} changebillingaddress={changebillingaddress} orderwithoutshippingaddress={orderwithoutshippingaddress} />
            <Modal2 showModal={showModal2} setShowModal={setShowModal2} changeshippingaddress={changeshippingaddress} changebillingaddress={changebillingaddress} orderwithoutshippingaddress={orderwithoutshippingaddress} />
            <div className="billing min-h-5/6 mt-10  grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="welcome-singh h-full p-[3vw] w-full flex flex-col justify-center items-center text-white bg-[#315ED2]">
                    <div className="svg"><img src={playstore} className="w-1/2 mx-auto" alt="..."></img></div>
                    <h1 className="text-5xl pb-2  w-fit border-b-4 mx-auto border-white font-medium text-center my-5 md:my-10 leading-[4rem]">Confirm your<br />Delivery Address</h1>
                </div>
                <div className="billing-form flex items-center w-full px-[5vw] py-[2vw] bg-white">
                    <form action="" className="mx-auto w-full grid gap-[1vw] p-[1vw] rounded-md shadow-2xl">
                        <div className="text">
                            <h1 className="py-5 text-6xl font-semibold">Delivery Address</h1>
                            <h1 className="py-5 text-sm font-semibold">Note: Delivery address is same as shipping address</h1>

                        </div>
                        <div className="input grid gap-5 ">
                            <div className="">
                                <label htmlFor="house" className="block mb-2 text-lg ">Enter House Or Plot Number</label>
                                <input value={house} id="house" name="house" onChange={(e) => { e.preventDefault(); sethouse(e.target.value); }} className="p-4 w-full bg-amber-100 rounded-md focus:outline-none " type="text" placeholder="House/Plot No." />
                            </div>
                            <div className="">
                                <label htmlFor="street" className="block mb-2 text-lg ">Enter Street or Landmark</label>
                                <input value={street} id="street" name="street" onChange={(e) => { e.preventDefault(); setstreet(e.target.value); }} className="p-4 w-full bg-amber-100 rounded-md focus:outline-none " type="text" placeholder="Street/Landmark" />
                            </div>
                            <div className="">
                                <label htmlFor="area" className="block mb-2 text-lg ">Enter Area</label>
                                <input value={area} onChange={(e) => { e.preventDefault(); setarea(e.target.value); }} className="p-4 w-full bg-amber-100 rounded-md focus:outline-none " type="text" placeholder="Area" />
                            </div>
                            <div className="">
                                <label htmlFor="city" className="block mb-2 text-lg ">Enter City</label>
                                <input value={city} id="city" name="city" onChange={(e) => { e.preventDefault(); setcity(e.target.value); }} className="p-4 w-full bg-amber-100 rounded-md focus:outline-none " type="text" placeholder="City" />
                            </div>
                            <div className="">
                                <label htmlFor="pin" className="block text-lg mb-2">Pincode</label>
                                <input value={pincode} onChange={(e) => {
                                    e.preventDefault();
                                    setpincode(e.target.value);
                                }} type="number" min={1} name="pin" id="pin" placeholder="Pincode" className="w-full p-4  bg-amber-100 rounded-md" />
                            </div>
                        </div>

                        <div className="flex justify-center">

                            <button className="btn mt-10 cursor-pointer w-fit px-14 py-4 bg-white border-2 border-[#315ED2] hover:bg-[#315ED2] hover:text-white text-[#315ED2] font-bold rounded-full" onClick={(e) => {
                                // console.log(user.accessToken);
                                e.preventDefault();
                                if (house == '') {
                                    toast.warning("House or Plot Number is required");
                                    return;
                                }
                                if (street == '') {
                                    toast.warning("Street or Landmark is required");
                                    return;
                                }
                                if (area == '') {
                                    toast.warning("Area is required");
                                    return;
                                }
                                if (city == '') {
                                    toast.warning("City is required");
                                    return;
                                }
                                if (pincode == '') {
                                    toast.warning("Pincode is required");
                                    return;
                                }
                                if (user.shipping_address.house == '' && user.billing_address.house == '') {

                                    setShowModal2(true);
                                    return;
                                }
                                if (user.shipping_address.house == '') {
                                    setShowModal(true);
                                    return;
                                }
                                if (user.billing_address.house == '') {
                                    setShowModal1(true);
                                    return;
                                }
                                else {
                                    if (location.state.type == 'regular')
                                        navigate('/customers', { state: { "totalAmount": location.state.totalAmount, 'type': 'regular', house, area, street, city, pincode, code: location.state.code,couponstatus:location.state.couponstatus,urlcode:location.state.urlcode } })
                                    else if (location.state.type == 'shortcut')
                                        navigate('/customers', { state: { "totalAmount": location.state.totalAmount, product_id: location.state.product_id, 'type': 'regular', house, area, street, city, pincode } })
                                }

                            }}>
                                Confirm Address
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </>
    );
}
export default Deliveryaddress;