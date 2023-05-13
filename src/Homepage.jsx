import sample from './assets/sample.png';
import book from './assets/book.png';
import star from './assets/star.png';
import author from './assets/author.png';
import playstore from './assets/playstore.png';
import homepagebg from './assets/homepagebg.png';
import homepagebg2 from './assets/homepagebg2.png';
import app from './Firebase';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import { Favorite } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { useEffect } from 'react';
function BookComp(props) {
    const navigate = useNavigate();
    return (
        <div className=' my-4 rounded-xl p-2 relative cursor-pointer' style={{ 'border': '1px solid #777777', 'width': '45%' }} >
            <img onClick={(e) => {
                e.preventDefault();
                navigate('/product', { state: props.prod })
            }} src={props.prod.image_url} className="w-full mx-auto " alt="" />
            <h1 className="text-md font-bold mb-0 mx-0 w-max mt-0" style={{ 'color': '#315ED2', 'maxWidth': '100%' }}>{props.prod.title}</h1>
            <h1 className="text-base font-semibold mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{props.prod.category}</h1>
            <h1 className="text-sm font-medium mb-0 mx-0 w-max mt-0" style={{ 'color': '#777777' }}>{props.prod.subtitle}</h1>
            <div className='w-full mt-1 mx-0 flex items-center'>
                <h1 className="text-base font-medium mb-0 mr-2  w-max mt-0" style={{ 'color': '#777777' }}>{props.prod.rating}</h1>
                <img className='mx-1 w-4' src={star} alt="" />
                <img className='mx-1 w-4' src={star} alt="" />
                <img className='mx-1 w-4' src={star} alt="" />
                <img className='mx-1 w-4' src={star} alt="" />
                <img className='mx-1 w-4' src={star} alt="" />
            </div>
            <div onClick={(e) => {
                let user = JSON.parse(localStorage.getItem('pubuser'));
                e.preventDefault();
                if (user) {

                    axios.post("https://singh-publication.onrender.com/api/user/addtowishlist", {


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
                        alert("Added to wishlist");
                    }
                    ).catch((err) => {
                        console.log(err);
                        if (err.response.status === 400) {
                            alert("Product already in wishlist");
                        }

                    }
                    )
                }
                else {
                    alert("Please login to add to wishlist");
                }
            }} className='w-8 flex items-center justify-center h-8 py-1 rounded-full absolute bottom-12  right-5' style={{ 'border': '2px solid rgba(217, 217, 217, 1)' }} >
                <Favorite style={{ 'color': 'rgba(217, 217, 217, 1)' }} />
            </div>
        </div>
    );
}


function Home() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    async function getallprods() {
        axios.get('https://singh-publication.onrender.com/api/product/getproducts').then((res) => {
            // console.log(res);
            setProducts(res.data);
        }).catch((err) => {
            console.log(err);
            alert("error");
            return;
        });
    }
    async function checkuser() {
        const auth = getAuth(app);
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            }

        });
    }
    useEffect(() => {
        // localStorage.removeItem('pubuser')
        // const auth = getAuth(app);
        // auth.signOut();
        // console.log(localStorage.getItem('pubuser'));
        // if (checkuser() === "push") {
        //     navigate('/login');
        // }
        // checkuser();
        getallprods();
        document.title = 'Singh Publication | Home';
    }, []);
    function Item(props) {
        const navigate = useNavigate();
        return (
            // <Paper style={{'borderRadius':'0px !important'}}>
            <div onClick={()=>{
                if(props.prod)
                navigate('/product',{state:props.prod})
                else
                alert("Wait for the prodcts to load")
            }} >
                <img  src={props.image} className='w-full h-72 md:h-max' style={{"maxHeight":'50vw'}} alt="..." />
            </div>
            // </Paper>
        )
    } function Testimonial() {
        return (
            // <Paper style={{'borderRadius':'0px !important'}}>
            <div className='w-full flex  justify-center'>
            <div className='flex w-4/5 md:flex-row flex-col rounded-lg' style={{'border':'1px solid #315ED2'}}>
                <div className='w-full items-center justify-center lg:w-1/3 py-8 px-8 lg:p-14 flex flex-col'>
                    <img src={author} className="w-40" alt="..." />

                </div>
                <div className='w-full lg:w-2/2  py-0 px-8 lg:p-14 '>
                    <h1 className='font-bold text-xl mt-3' style={{ 'color': '#315ED2' }}>Dr. (Prof) Sher Singh Morodiya</h1>
                    <h1 className='font-semibold text-sm mb-3' style={{ 'color': '#315ED2' }}>Director & Author (Singh Publication)</h1>
                    <p className='text-sm font-medium mb-10'>
                        Dr. (Prof.) Sher Singh Morodiya, received his Master of
                        Nursing Degree from Raj Kumari Amrit Kaur College of Nursing,
                        University of Delhi. He has got Ph.D. Degree in 2013. He started his
                        career after General Nursing Diploma as Basic Nurse at Government
                        dispensary in 1984 and step by step; obtained a chance to work on the
                        post of the Officer on Special Duty to the Additional Chief Secretary
                        (Medical & Health) along with the responsibility of Deputy Director
                        (Nursing) i.e. highest post in Government of Rajasthan for nursing personnel.
                        
                    </p>
                </div>
            </div>
            </div>
        )
    }
    return (
        <>
            <div className="w-full flex flex-col justify-center pb-5">
                <div id='mainslider'>

                    <Carousel navButtonsAlwaysVisible="true" indicators="false" animation='slide' duration="800">

                        <Item image={homepagebg} prod={products[0]} />
                        <Item image={homepagebg2} prod={products[0]} />

                    </Carousel>

                </div>
                <div className="w-full ">
                    <div className='w-full h-max justify-center lg:h-72 xl:h-72 2xl:h-72 flex flex-col lg:flex-row sm:flex-col md:flex-col items-center mt-5 lg:mt-20'>
                        <div className='w-full items-center justify-center lg:w-1/3 py-8 px-8 lg:p-0 flex flex-col'>
                            <img src={author} className="w-4/5" alt="..." />

                        </div>
                        <div className='w-full lg:w-2/2  py-0 px-8 lg:p-14 '>
                            <h1 className='font-bold text-xl mt-3' style={{ 'color': '#315ED2' }}>Dr. (Prof) Sher Singh Morodiya</h1>
                            <h1 className='font-semibold text-sm mb-3' style={{ 'color': '#315ED2' }}>Director & Author (Singh Publication)</h1>
                            <p className='text-sm font-medium mb-10'>
                                Dr. (Prof.) Sher Singh Morodiya, received his Master of
                                Nursing Degree from Raj Kumari Amrit Kaur College of Nursing,
                                University of Delhi. He has got Ph.D. Degree in 2013. He started his
                                career after General Nursing Diploma as Basic Nurse at Government
                                dispensary in 1984 and step by step; obtained a chance to work on the
                                post of the Officer on Special Duty to the Additional Chief Secretary
                                (Medical & Health) along with the responsibility of Deputy Director
                                (Nursing) i.e. highest post in Government of Rajasthan for nursing personnel.
                                He is having 39 Years of experience in the field of nursing He has lot of
                                confidence in area of teaching, guiding, examining/evaluating, care of clients,
                                research and management/administrationat various levels of health care settings. He
                                is author and translator of books. He is Editor-in-Chief and member of editorial
                                board in seven peer reviewed/refereed journals from India and abroad. He has been
                                presented many research papers International Conferences and four in National
                                conferences. He has received BEST PAPER AWARD in an International Conference
                                held in 2019. He is life time member in ten professional bodies.
                            </p>
                        </div>
                    </div>

                </div>
                <h1 className="text-2xl font-medium mb-5 mx-auto w-max mt-5 md:mt-20" style={{ 'color': '#315ED2' }}>Best Sellers</h1>
                <div className='w-full md:w-1/2 flex md:px-0 px-3 mx-auto flex-wrap justify-between'>
                    {/* <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp />
                        <BookComp /> */}
                    {products.map((prod, index) => {
                        return <BookComp key={index} prod={prod} />
                    })}

                </div>
                <div className='w-full flex h-60 flex-col justify-center items-center' style={{ 'backgroundColor': '#315ED2' }}>
                    <h1 className="text-2xl font-semibold mx-auto mt-5" style={{ 'color': 'white' }}>Also Available on Playstore</h1>
                    <h1 className="text-sm font-normal mx-auto mt-2" style={{ 'color': 'white' }}>Enjoy the Best collection book here</h1>
                    <h1 className="text-sm font-semibold mx-auto  mt-2" style={{ 'color': 'white' }}>Download Now!</h1>
                    <img src={playstore} className="w-40 mt-10" alt="..." />
                </div>
                <h1 className="text-2xl font-medium mb-5 mx-auto w-max mt-10" style={{ 'color': '#315ED2' }}>Testimonials</h1>
                <div id='mainslider' className='mb-5'>

                    <Carousel navButtonsAlwaysVisible="true" indicators="false" animation='slide' duration="800">

                        <Testimonial />
                        <Testimonial />
                        <Testimonial />

                    </Carousel>

                </div>
                <div className='w-full flex h-52 flex-col justify-center items-center' style={{ 'backgroundColor': '#315ED2' }}>
                    <h1 className="text-3xl font-bold mx-auto mt-5" style={{ 'color': 'white' }}>Become our retail partner</h1>
                    
                    <button onClick={(e)=>{
                        e.preventDefault();
                        navigate('/contact');
                    }} className='bg-white text-center px-8 py-4 rounded-xl font-bold mt-8' style={{'color':'#315ED2'}}>Join Now</button>
                </div>
            </div>
        </>
    );
}
export default Home;