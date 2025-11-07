import React from 'react';
import { MapPinIcon, PhoneIcon, StarIcon, WhatsAppIcon, LinkIcon } from './Icons';

const reviews = [
    {
        name: "Aarav Sharma",
        rating: 5,
        comment: "The best masala chai I've had in ages! The atmosphere is so cozy and welcoming. A perfect spot to relax."
    },
    {
        name: "Priya Patel",
        rating: 4,
        comment: "Lovely place with a great variety of teas. The Gulkand Lassi is a must-try! A bit crowded on weekends."
    },
    {
        name: "Rohan Desai",
        rating: 5,
        comment: "Excellent service and fantastic chai. The staff is super friendly. I'm a regular here now. Highly recommended!"
    }
];

const ReviewCard: React.FC<{ review: typeof reviews[0] }> = ({ review }) => (
    <div className="bg-light-cream p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
            <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={i < review.rating ? 'text-amber-500' : 'text-gray-300'} />
                ))}
            </div>
            <p className="ml-auto text-sm font-semibold text-deep-tea-brown">{review.name}</p>
        </div>
        <p className="text-charcoal-gray text-sm">"{review.comment}"</p>
    </div>
);


const InfoPage: React.FC = () => {
    return (
        <div className="p-4 space-y-6">
            {/* Google Maps Section */}
            <div className="bg-light-cream rounded-2xl shadow-md overflow-hidden">
                 <h2 className="text-xl font-bold text-deep-tea-brown p-4 pb-0">Our Location</h2>
                 <p className="text-sm text-charcoal-gray px-4">Find us here!</p>
                <div className="p-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.475968257807!2d78.45258649999999!3d17.567155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb85d3b6264f33%3A0x286ef5121696803e!2sChai%20Club!5e0!3m2!1sen!2sin!4v1722108719576!5m2!1sen!2sin"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>

            {/* Contact & Hours Section */}
            <div className="bg-light-cream p-4 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-deep-tea-brown mb-3">Contact & Hours</h2>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <MapPinIcon />
                        <span className="text-charcoal-gray">Chai club, St road, Maisammaguda, Dulapally, Hyderabad, Telangana 500100</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <PhoneIcon />
                        <div>
                            <span className="font-semibold text-deep-tea-brown block">bhanu Prasad</span>
                            <a href="tel:+919652986182" className="text-charcoal-gray hover:underline">+91 96529 86182</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-button-cream my-4"></div>
                <div>
                    <h3 className="font-semibold text-deep-tea-brown mb-2">Opening Hours</h3>
                    <div className="flex justify-between text-charcoal-gray text-sm">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 10:00 PM</span>
                    </div>
                     <div className="flex justify-between text-charcoal-gray text-sm">
                        <span>Saturday - Sunday</span>
                        <span>10:00 AM - 11:00 PM</span>
                    </div>
                </div>
            </div>
            
            {/* Reviews Section */}
            <div className="bg-light-cream p-4 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-deep-tea-brown mb-1">Customer Reviews</h2>
                <p className="text-xs text-gray-500 mb-4">Source: Google Reviews</p>
                <div className="space-y-3">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
            </div>

            {/* Developer Credit Section */}
            <div className="bg-light-cream p-5 rounded-2xl shadow-md text-center">
                <h3 className="text-sm font-semibold text-charcoal-gray">Website Developed & Maintained by</h3>
                <p className="text-xl font-bold text-deep-tea-brown mt-1">Charan Sai Kondilla</p>
                <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                    <a 
                      href="https://wa.me/917995597570" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-button-cream text-deep-tea-brown font-semibold py-2.5 px-5 rounded-lg hover:bg-opacity-80 transition-all duration-200 shadow-sm"
                    >
                        <WhatsAppIcon />
                        <span>WhatsApp</span>
                    </a>
                     <a 
                      href="#" // TODO: Add developer portfolio link here
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-button-cream text-deep-tea-brown font-semibold py-2.5 px-5 rounded-lg hover:bg-opacity-80 transition-all duration-200 shadow-sm"
                    >
                        <LinkIcon />
                        <span>Portfolio</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;