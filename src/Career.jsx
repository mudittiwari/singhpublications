import { useNavigate } from "react-router-dom";
import career from './assets/career.png';
function Career(){
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full flex flex-col items-center py-10">
            <h1 className="text-2xl font-bold mb-5" style={{ 'color': '#315ED2' }}>Careers</h1>
            <h1 className="text-2xl text-center font-medium mb-5" style={{ 'color': '#777777' }}>Explore career opportunity at Singh Publication.</h1>
            <button onClick={(e) => {
                        e.preventDefault();
                        navigate('/contact');



                    }} className=" text-white px-6 py-2 mt-3 rounded-3xl focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                        Join Us
                    </button>
                    <h1 className="text-sm font-medium mb-5 w-4/5 text-center mt-10 md:w-2/3">Welcome to the career page of Singh Publication, where extraordinary talent meets limitless opportunities. We are thrilled that you're considering joining our dynamic team and embarking on an exciting journey of professional growth and personal fulfilment.</h1>
                    <img src={career} className="w-screen" alt="" />
            </div>
        </>
    );

}
export default Career;