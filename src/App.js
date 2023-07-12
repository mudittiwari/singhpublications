import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import ShippingAddress from './ShippingAddress';
import ProfileSetting from './ProfileSetting';
import AccountSetting from './AccountSetting';
import Home from './Homepage';
import Wishlist from './Wishlist';
import Cart from './Cart';
import PurchasedBooks from './PurchasedBooks';
import Orderdetails from './Orderdetails';
import Navbar from './comps/Navbar';
import Orders from './Orders';
import Otp from './Otp';
import BillingAddress from './BillingAddress';
import { BrowserRouter,HashRouter ,Routes, Route } from 'react-router-dom';
import Footer from './comps/Footer';
import Product from './Product';
import Deliveryaddress from './Deliveryaddress';
import Orderplaced from './Orderplaced';
import About from './About';
import Contact from './Contact';
import Pdfview from './Pdfview';
import Policy from './Policy';
import Terms from './Terms';
import Career from './Career';
import Refund from './Refund';
import Faq from './Faq';
import Disclaimer from './Disclaimer';
import Customers from './Customers';
import SignupSuccess from './signupSuccess';
import Dashboard from './dashboard';
import retailer from './assets/Singh Retail banner (2).jpg';
import Signupverification from './Signupotp';
import Forgetpassword from './Forgetpassword';
import Resetpassword from './Resetpassword';
import Books from './Books';
import Coupon from './Coupon';
// import Partner from './Partner';




function App() {
  return (
    <>
    
     <HashRouter>
     <Navbar />
        <Routes>
          <Route exact  path="/" element={<Home />} />
          <Route exact  path="/login" element={<Login />} />
          <Route exact  path="/otp" element={<Otp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shippingaddress" element={<ShippingAddress />} />
          <Route path="/billingaddress" element={<BillingAddress />} />
          <Route path="/deliveryaddress" element={<Deliveryaddress />} />
          <Route path="/profilesetting" element={<ProfileSetting />} />
          <Route path="/accountsetting" element={<AccountSetting />} />
          <Route path="/books" element={<PurchasedBooks />} />
          <Route path="/allbooks" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/viewbook" element={<Pdfview />} />
          <Route path="/applycoupon/:code" element={<Coupon />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchasedbooks" element={<PurchasedBooks />} />
          <Route path="/orderdetails" element={<Orderdetails />} />
          <Route path="/orderplaced" element={<Orderplaced />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product" element={<Product />} />
          <Route path="/privacypolicy" element={<Policy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/signupSuccess" element={<SignupSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signupverification" element={<Signupverification />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          
          <Route path="./assets/Singh Retail banner (2).jpg" element={<retailer />} />
          {/* <Route path="./assets/navbar 1-04 2.png" element={<navimg />} /> */}
          {/* <Route path="/partner" element={<Partner />} /> */}


          <Route path="/t&c" element={<Terms />} />
          

        </Routes>
        <Footer/>
      </HashRouter>
      
    </>
  );
}

export default App;

//add review section in the product page
//add page for viewing pdf of the book
//fix security issues in the api(forget password and other things)

