import { useEffect } from 'react';
import { useState } from 'react';
import map from './assets/map.png';
import axios from 'axios';
import LoadingBar from './comps/Loadingbar';

const Contact = () => {
    const [loading, setloading] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Singh Publication | Contact Us';
    }, [])
    return (
        <>
        {loading && <LoadingBar/>}
            <div className="md:w-1/2 w-full mx-auto justify-center px-10 py-5">
                <h1 className="text-2xl font-medium mb-5 mx-auto w-max mt-5" style={{ 'color': '#315ED2' }}>Contact Us</h1>
                <input value={name} onChange={(e) => {
                    setName(e.target.value);
                }} type="text" placeholder="Name" className="w-full px-2 py-2 mt-4 text-center rounded-lg outline-none" style={{ 'border': '1px solid #777777' }} />
                <input value={phone} onChange={(e) => {
                    setPhone(e.target.value);
                }} type="tel" placeholder="Phone Number" className="w-full px-2 py-2 mt-4 text-center rounded-lg outline-none" style={{ 'border': '1px solid #777777' }} />
                <input value={subject} onChange={(e) => {
                    setSubject(e.target.value);
                }} type="text" placeholder="Subject" className="w-full px-2 py-2 mt-4 text-center rounded-lg outline-none" style={{ 'border': '1px solid #777777' }} />
                <input value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }
                } type="email" placeholder="Email Address" className="w-full px-2 py-2 mt-4 text-center rounded-lg outline-none" style={{ 'border': '1px solid #777777' }} />
                <textarea value={description} onChange={(e) => {
                    setDescription(e.target.value);
                }} name="" id="" style={{ 'border': '1px solid #777777' }} className="w-full mt-6 px-2 py-2 outline-none rounded-lg text-center resize-none" placeholder='message'>Description</textarea>
                <div className='w-full flex justify-center'>
                    <button className=" text-white px-12 py-2 mt-5 rounded-2xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}
                        onClick={(e) => {
                            setloading(true);
                            e.preventDefault();
                            axios.post('https://singhpublications.onrender.com/contact', {
                                name: name,
                                phone: phone,
                                subject: subject,
                                email: email,
                                message: description
                            }).then((res) => {
                                setloading(false);
                                console.log(res);
                            }).catch((err) => {
                                setloading(false);
                                console.log(err);
                            }
                            )
                        }}>Send</button>
                </div>

            </div>
            <div className='w-full flex flex-col md:flex-row h-max justify-center md:items-start items-center py-5 mt-5' style={{ 'backgroundColor': '#315ED2' }}>
                <div className='w-max rounded-2xl overflow-hidden'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.6169804468354!2d75.76172679999999!3d26.883907599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5558aea2575%3A0xd53fbb24d469e795!2sSingh%20Publication!5e0!3m2!1sen!2sin!4v1683869607111!5m2!1sen!2sin" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                
                </div>
                <div className='flex flex-col ml-5'> 
                    <div className='flex'> <h1 className="text-sm font-semibold   mt-2" style={{ 'color': 'white' }}>Address: </h1>
                        <h1 className="text-sm font-normal mt-2 ml-2" style={{ 'color': 'white' }}> 401, katewa nagar, New sanganer road, Sodala, Jaipur, Jaipur, Rajasthan, 302019</h1>
                    </div>
                    
                    <div className='flex'> <h1 className="text-sm font-semibold   mt-2" style={{ 'color': 'white' }}>Contact Number: </h1>
                        <h1 className="text-sm font-normal  mt-2 ml-2" style={{ 'color': 'white' }}>9414784402, 93512 32580</h1>
                    </div>
                    <div className='flex'> <h1 className="text-sm font-semibold mt-2" style={{ 'color': 'white' }}>Email: </h1>
                        <h1 className="text-sm font-normal  mt-2 ml-2" style={{ 'color': 'white' }}>singhpublicationjaipur@gmail.com</h1>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Contact;