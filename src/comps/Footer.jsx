
import { Facebook, Twitter, LinkedIn, Instagram, Call } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function Footer() {
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full h-max py-5 mt-10 footer">
                <div className="w-full flex md:hidden justify-center py-4" style={{ 'borderBottom': '1px solid black', 'borderTop': '1px solid black' }}>
                    <div className="flex md:hidden w-96 justify-center">
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1">T&C</h1> </div>
                        <div className="h-7 mx-2" style={{ 'width': '1px', 'backgroundColor': 'black' }}></div>
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1">Mobile App</h1> </div>
                        <div className="h-7 mx-2" style={{ 'width': '1px', 'backgroundColor': 'black' }}></div>
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1">Privacy Policy</h1> </div>
                        <div className="h-7 mx-2" style={{ 'width': '1px', 'backgroundColor': 'black' }}></div>
                        <div className="flex justify-center" onClick={(e)=>{
                            e.preventDefault();
                            navigate('/about');
                        }}><h1 className="font-bold text-xs mt-1">About Us</h1> </div>
                        <div className="h-7 mx-2" style={{ 'width': '1px', 'backgroundColor': 'black' }}></div>
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1"  onClick={(e)=>{
                            e.preventDefault();
                            navigate('/contact');
                        }}>Contact Us</h1> </div>
                        
                    </div>

                </div>
                <div className="w-full h-full items-center flex md:flex-row flex-col justify-around">
                    <div className="w-max md:my-0 my-2">
                        <a className="mx-2" target="_blank" href="https://www.facebook.com/singhpublication">
                            <Facebook style={{ 'fontSize': '40px', 'color': '#315ED2' }} />
                        </a>
                        <a className="mx-2" target="_blank" href="https://www.instagram.com/singhpublication/">
                            <Instagram style={{ 'fontSize': '40px', 'color': '#315ED2' }} />
                        </a>
                        <a className="mx-2 " target="_blank" href="https://twitter.com/SinghPub_Jaipur">
                            <Twitter style={{ 'fontSize': '40px', 'color': '#315ED2' }} />
                        </a>
                        <a className="mx-2" target="_blank" href="https://www.linkedin.com/company/singh-publication/">
                            <LinkedIn style={{ 'fontSize': '40px', 'color': '#315ED2' }} />
                        </a>


                    </div>
                    <div className="md:flex mt-5 mb-5 hidden w-max justify-center">
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1">T&C</h1> </div>
                        <div className="w-8 mx-0 my-auto" ></div>
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1">Mobile App</h1> </div>
                        <div className="w-8 mx-0 my-auto" ></div>
                        <div className="flex justify-center"><h1 className="font-bold text-xs mt-1">Privacy Policy</h1> </div>
                        <div className="w-8 mx-0 my-auto" ></div>
                        <div className="flex justify-center cursor-pointer" onClick={(e)=>{
                            e.preventDefault();
                            navigate('/about');
                        }}><h1 className="font-bold text-xs mt-1">About Us</h1> </div>
                        <div className="w-8 mx-0 my-auto" ></div>
                        <div className="flex justify-center cursor-pointer" onClick={(e)=>{
                            e.preventDefault();
                            navigate('/contact');
                        }}><h1 className="font-bold text-xs mt-1">Contact Us</h1> </div>
                        <div className="w-8 mx-0 my-auto" ></div>
                        <div className="flex justify-center"><h1 style={{'color':'rgba(0, 0, 0, 0.8)'}} className="font-bold text-xs mt-1">© Singh Publication, Inc. 2023. </h1> </div>
                    </div>
                    

                </div>
                <h1 style={{'color':'rgba(0, 0, 0, 0.8)'}}  className="font-bold w-max text-center mx-auto md:hidden flex  md:my-5 my-2">© Singh Publication, Inc. 2023.</h1>
            </div>
        </>
    );

}
export default Footer;