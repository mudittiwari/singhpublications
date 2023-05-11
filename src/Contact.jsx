import { useEffect } from 'react';
import { useState } from 'react';
import map from './assets/map.png';

const Contact = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
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
                            e.preventDefault();

                        }}>Send</button>
                </div>

            </div>
            <div className='w-full flex flex-col md:flex-row h-max justify-center md:items-start items-center py-5 mt-5' style={{ 'backgroundColor': '#315ED2' }}>
                <img src={map} className="w-40" alt="..." />
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