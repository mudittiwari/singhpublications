import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Coupon()
{
    const {code} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('pubuser') === null) {
            navigate('/login',{state:{from:'coupon',code:code}});
        }
        else
        {
            navigate('/cart',{state:{code:code}})
        }
    }, []);
    return (
        <>
            <h1>Coupon code is {code}</h1>
        </>
    );

}

export default Coupon;