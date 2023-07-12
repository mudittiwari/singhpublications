import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Coupon()
{

    async function checkcoupon()
    {
        axios.get('https://singhpublication.in/api/getcoupons').then((response) => {
            // console.log(response);
            for(let i=0;i<response.data.length;i++)
            {
                let url=response.data[i].url;
                let book=response.data[i].book;
                if(url.split('/')[url.split('/').length-1]===code)
                {
                   console.log("found")
                   if (localStorage.getItem('pubuser') === null) {
                        navigate('/login',{state:{from:'coupon',code:book,urlcode:code}});
                        return;
                    }
                    else
                    {
                        navigate('/cart',{state:{code:book,urlcode:code}})
                        return;
                    }
                }
                navigate('/',{state:{'error':'coupon'}});
            }
            // 
        }).catch((error) => {console.log(error)});
    }

    const {code} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        checkcoupon();
    }, []);
    return (
        <>
            <h1>Coupon code is {code}</h1>
        </>
    );

}

export default Coupon;