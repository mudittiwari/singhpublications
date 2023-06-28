import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
    const navigate = useNavigate();
    const [user,setuser]=useState(JSON.parse(localStorage.getItem('pubuser')));
    return (
        <div className="dashboard">
            {/* <div className="text text-center text-[#315ED2]">
                
            </div> */}
            <div className="content min-h-5/6 flex flex-col justify-center items-center text-center gap-10 p-9">
                <div className="text text-center text-[#315ED2]">
                    <h1 className="text-6xl font-semibold">Dashboard</h1>
                </div>
                <div className="welcome-vivek ">
                    <h1 className=" text-2xl mb-8 font-semibold">Welcome {user.firstname} {user.lastname}!</h1>
                    <div className=" w-fit mx-auto card text-center grid grid-cols-2 justify-center items-center gap-5 sm:gap-20">
                        <div className="box p-1 h-full sm:p-10 shadow-2xl grid gap-5 max-w-[300px] cursor-pointer rounded-lg" onClick={(e) => {
                            e.preventDefault();
                            navigate('/purchasedbooks');
                        }}>
                            <div className="icon w-fit mx-auto p-3 sm:p-9 text-4xl sm:text-8xl text-[#315ED2]"><i class="fa-solid fa-book"></i></div>
                            <h2 className="text-2xl">Purchased Books</h2>
                        </div>
                        <div className="box p-1 h-full sm:p-10 shadow-2xl grid gap-5 max-w-[300px] cursor-pointer rounded-lg" onClick={(e) => {
                            e.preventDefault();
                            navigate('/Orders');
                        }}>
                            <div className="icon w-fit mx-auto p-3 sm:p-9 text-4xl sm:text-8xl text-[#315ED2]"><i class="fa-solid fa-cart-shopping"></i></div>
                            <h2 className="text-2xl">Orders</h2>
                        </div>
                        <div className="box p-1 h-full sm:p-10 shadow-2xl grid gap-5 max-w-[300px] cursor-pointer rounded-lg" onClick={(e) => {
                            e.preventDefault();
                            navigate('/allbooks');
                        }}>
                            <div className="icon w-fit mx-auto p-3 sm:p-9 text-4xl sm:text-8xl text-[#315ED2]"><i class="fa-solid fa-book-bookmark"></i></div>
                            <h2 className="text-2xl">Get Books</h2>
                        </div>
                        <div className="box p-1 h-full sm:p-10 shadow-2xl grid gap-5 max-w-[300px] cursor-pointer rounded-lg" onClick={(e) => {
                            e.preventDefault();
                            navigate('/accountsetting');
                        }}>
                            <div className="icon w-fit mx-auto p-3 sm:p-9 text-4xl sm:text-8xl text-[#315ED2]"><i class="fa-solid fa-user"></i></div>
                            <h2 className="text-2xl">Account Settings</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}





export default Dashboard;