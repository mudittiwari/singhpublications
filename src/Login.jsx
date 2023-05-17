import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingBar from "./comps/Loadingbar";
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setloading] = React.useState(false);
    useEffect(() => {
        document.title = 'Singh Publication | Login';
    }, []);
    return (
        <>
        {loading && <LoadingBar />}
            <div className="w-screen h-max py-8 flex items-center justify-center
            ">
                <div className="w-4/5 py-5 h-max bg-white flex flex-col items-center justify-center rounded-lg
            " style={{ 'border': '1px solid #777777' }}>
                    <h1 className="text-2xl font-medium mb-5" style={{ 'color': '#315ED2' }}>Login</h1>
                    <input value={email} onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="email"
                        placeholder="Email Address"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    />
                    
                    <input value={password} onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="password"
                        placeholder="Password"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    />
                    <button onClick={(e) => {
                        e.preventDefault();
                        if(email.trim()===""){
                            alert("Email is required");
                            return;
                        }
                        if(password.trim()===""){
                            alert("Password is required");
                            return;
                        }
                        setloading(true);
                        axios.post("https://singhpublications.onrender.com/api/user/login", {
                            email: email,
                            // mobileNumber: mobileNumber,
                            password: password,
                        }).then((res) => {
                            console.log(res);
                            setloading(false);
                            if (res.status===200) {
                                // localStorage.setItem("pubuser", JSON.stringify(res.data));
                                // console.log(localStorage.getItem("pubuser"));
                                navigate("/otp", { state: { phone: res.data.phone_number,user:res.data } });
                            } else {
                                alert("Invalid Credentials");
                            }
                        }).catch((err) => {
                            setloading(false);
                            alert("error");
                            console.log(err);
                        }
                        )

                    }} className=" text-white px-12 py-2 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}
export default Login;