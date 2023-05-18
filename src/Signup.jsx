import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingBar from "./comps/Loadingbar";
function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("male");
    const [birthDate, setBirthDate] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    function isAlphanumericPassword(str) {
        return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(str);
    }
    const handleChange = (event) => {
        setGender(event.target.value);
    };
    useEffect(() => {
        document.title = 'Singh Publication | Sign Up';
    }, []);

    return (
        <>
            {loading && <LoadingBar />}
            <div className="w-full h-max my-5 py-5 flex items-center justify-center
            ">
                <div className="w-4/5 h-max py-5 bg-white flex flex-col items-center justify-center rounded-lg
            " style={{ 'border': '1px solid #777777' }}>
                    <h1 className="text-2xl font-medium mb-5" style={{ 'color': '#315ED2' }}>Signup</h1>
                    <input value={firstName} onChange={(e) => {
                        e.preventDefault();
                        setFirstName(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="text"
                        placeholder="First Name"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    />
                    <input value={lastName} onChange={(e) => {
                        e.preventDefault();
                        setLastName(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="text"
                        placeholder="Last Name"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    /><input value={email} onChange={(e) => {
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
                    <div className="my-2">

                        <label className="mx-2">
                            <input
                                type="radio"
                                value="male"
                                checked={gender === "male"}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label className="mx-2">
                            <input
                                type="radio"
                                value="female"
                                checked={gender === "female"}
                                onChange={handleChange}
                            />
                            Female
                        </label>

                    </div>
                    <input value={birthDate} onChange={(e) => {
                        e.preventDefault();
                        setBirthDate(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="date"
                        placeholder="Birth Date"
                        style={{
                            'border': '1px solid #777777',
                            'backgroundColor': '#fff',
                            'textAlign': 'center',
                        }}
                    /><input value={mobileNumber} onChange={(e) => {
                        e.preventDefault();
                        setMobileNumber(e.target.value);
                    }} className="p-2 w-72 my-1 rounded-xl focus:outline-none"
                        type="number"
                        placeholder="Mobile Number"
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
                        if (firstName.trim().length === 0) {
                            alert('First Name is required');
                            return;
                        }
                        if (lastName.trim().length === 0) {
                            alert('Last Name is required');
                            return;
                        }
                        if (email.trim().length === 0) {
                            alert('Email is required');
                            return;
                        }
                        if(email.indexOf('@')===-1 || email.indexOf('.')===-1)
                        {
                            alert('Please enter a valid email');
                            return;
                        }
                        if (birthDate.trim().length === 0) {
                            alert('Birth Date is required');
                            return;
                        }
                        if (mobileNumber.trim().length != 10) {
                            alert('Mobile Number not valid');
                            return;
                        }
                        if (password.trim().length < 8) {
                            alert('Password must be 8 characters long');
                            return;
                        }
                        if (!isAlphanumericPassword(password)) {
                            alert('Password must contain atleast one alphabet and one number');
                            return;
                        }
                        setLoading(true);
                        axios.post('https://singhpublications.onrender.com/api/user/register', {
                            firstname: firstName,
                            lastname: lastName,
                            email: email,
                            gender: gender,
                            dob: birthDate,
                            mobile: mobileNumber,
                            password: password,
                        }).then((res) => {
                            setLoading(false);
                            console.log(res);
                            
                            if (res.data === 'success') {
                                navigate('/login');
                            }
                        }
                        ).catch((err) => {
                            setLoading(false);
                            alert("error");
                            console.log(err);
                        }
                        );



                    }} className=" text-white px-12 py-2 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                        Signup
                    </button>
                </div>
            </div>
        </>
    );
}
export default Signup;