import { useNavigate } from "react-router-dom";
// import refund from './assets/career.png';
function Faq() {
    const navigate = useNavigate();
    return (
        <>
            <div className="policy grid gap-5 px-[5vw] md:px-[15vw]">
                {/* <img src={career} className="w-screen" alt="" /> */}

                <h1 className="text-5xl w-fit mx-auto font-medium text-center mt-3 md:my-10" style={{ 'color': '#315ED2' }}>FAQ</h1>
                <div className=" px-5 w-full bg-white">
                    <div className="w-full grid divide-y divide-neutral-200 sm:mt-8">
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> What is a SAAS platform?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3">
                                    SAAS platform is a cloud-based software service that allows users to access
                                    and use a variety of tools and functionality.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> How does  billing work?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3">
                                    We offers a variety of billing options, including monthly and annual subscription plans,
                                    as well as pay-as-you-go pricing for certain services. Payment is typically made through a credit
                                    card or other secure online payment method.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> Can I get a refund for my subscription?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3">
                                    We offers a 30-day money-back guarantee for most of its subscription plans. If you are not
                                    satisfied with your subscription within the first 30 days, you can request a full refund. Refunds
                                    for subscriptions that have been active for longer than 30 days may be considered on a case-by-case
                                    basis.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> How do I cancel my subscription?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3">
                                    To cancel your We subscription, you can log in to your account and navigate to the
                                    subscription management page. From there, you should be able to cancel your subscription and stop
                                    future billing.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> Can I try this platform for free?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3">
                                    We offers a free trial of its  platform for a limited time. During the trial period,
                                    you will have access to a limited set of features and functionality, but you will not be charged.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> How do I access   documentation?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3">
                                    Documentation is available on the company's website and can be accessed by
                                    logging in to your account. The documentation provides detailed information on how to use the ,
                                    as well as code examples and other resources.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> How do I contact support?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3 group-open:animate-fadeIn">
                                    If you need help with the platform or have any other questions, you can contact the
                                    company's support team by submitting a support request through the website or by emailing at
                                    singhpublicationjaipur@gmail.com.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> Do you offer any discounts or promotions?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3 group-open:animate-fadeIn">
                                    We may offer discounts or promotions from time to time. To stay up-to-date on the latest
                                    deals and special offers, you can sign up for the company's newsletter or follow it on social media.
                                </p>
                            </details>
                        </div>
                        <div className="py-3 sm:py-5">
                            <details className="group bg-blue-400 p-5 text-white rounded-md">
                                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                                    <span> How do we compare to other similar services?</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <p className=" mt-3 group-open:animate-fadeIn">
                                    This platform is a highly reliable and feature-rich service that offers a wide range
                                    of tools and functionality. It is competitively priced and offers a variety of billing options to
                                    suit different needs and budgets.
                                </p>
                            </details>
                        </div>

                    </div>
                </div>


                {/* <h1 className="text-4xl font-normal my-5" style={{ 'color': '#777777' }}>Refund.</h1> */}
                {/* <button onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');



                }} className=" text-white px-10 py-2 mt-3 rounded-lg focus:outline-none" style={{ 'backgroundColor': "#315ED2" }}>
                    Join Today
                </button> */}

            </div >



        </>
    );

}
export default Faq;