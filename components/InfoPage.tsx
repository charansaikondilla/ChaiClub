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

            {/* Developer Credit Section - Matching Chai Club Theme */}
            <div className="relative bg-gradient-to-br from-creamy-beige via-light-cream to-creamy-beige p-6 rounded-3xl shadow-2xl border-2 border-button-cream overflow-hidden">
                {/* Decorative Background Elements - Tea Theme */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-deep-tea-brown rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-charcoal-gray rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-button-cream rounded-full blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Badge Header - Tea Brown Theme */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="bg-gradient-to-r from-deep-tea-brown to-charcoal-gray px-5 py-2 rounded-full shadow-lg border border-button-cream">
                            <p className="text-xs font-bold text-light-cream uppercase tracking-widest flex items-center gap-2">
                                <span className="text-base">⚡</span>
                                <span>Powered by</span>
                            </p>
                        </div>
                    </div>

                    {/* Company Branding Card - Glass Effect with Theme Colors */}
                    <div className="bg-white/60 backdrop-blur-md border-2 border-button-cream rounded-2xl p-6 mb-5 shadow-xl">
                        <div className="text-center">
                            {/* Logo with Tea Theme */}
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-deep-tea-brown via-charcoal-gray to-deep-tea-brown rounded-2xl mb-4 shadow-2xl border-2 border-button-cream transform hover:scale-105 transition-transform duration-300">
                                <span className="text-4xl font-black text-light-cream drop-shadow-lg">T</span>
                            </div>
                            
                            {/* Company Name - Gradient matching tea colors */}
                            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-deep-tea-brown via-charcoal-gray to-deep-tea-brown mb-2 tracking-tight drop-shadow-sm">
                                Techmans
                            </h3>
                            
                            {/* Tagline */}
                            <div className="inline-block bg-button-cream px-4 py-1 rounded-full">
                                <p className="text-xs font-semibold text-deep-tea-brown">
                                    Web Development & Digital Solutions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons - Matching Theme Colors */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-5">
                        {/* WhatsApp Button - Tea Brown Primary */}
                        <a 
                          href="https://wa.me/917995597570" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 group relative bg-gradient-to-br from-deep-tea-brown to-charcoal-gray text-light-cream font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-button-cream transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            
                            <div className="relative flex items-center justify-center gap-3">
                                <div className="bg-light-cream/20 p-2 rounded-lg">
                                    <WhatsAppIcon />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-button-cream font-medium">Chat with us on</p>
                                    <p className="text-lg font-black">WhatsApp</p>
                                </div>
                            </div>
                        </a>

                        {/* Portfolio Button - Complementary Color */}
                        <a 
                          href="https://charansaikondilla.github.io/Techmans/#" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 group relative bg-gradient-to-br from-charcoal-gray to-deep-tea-brown text-light-cream font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-button-cream transition-all duration-300 hover:scale-105 overflow-hidden"
                        >
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            
                            <div className="relative flex items-center justify-center gap-3">
                                <div className="bg-light-cream/20 p-2 rounded-lg">
                                    <LinkIcon />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-button-cream font-medium">Explore our</p>
                                    <p className="text-lg font-black">Portfolio</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Contact Info Bar - Refined with Theme */}
                    <div className="bg-button-cream/50 backdrop-blur-sm rounded-xl py-3 px-5 border border-button-cream">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                            {/* Phone */}
                            <div className="flex items-center gap-2">
                                <div className="bg-deep-tea-brown/10 p-2 rounded-lg">
                                    <span className="text-lg">📞</span>
                                </div>
                                <a 
                                  href="tel:+917995597570" 
                                  className="text-sm font-bold text-deep-tea-brown hover:text-charcoal-gray transition-colors"
                                >
                                  +91 79955 97570
                                </a>
                            </div>
                            
                            <span className="hidden sm:block w-px h-6 bg-deep-tea-brown/20"></span>
                            
                            {/* Availability Badge */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs font-semibold text-charcoal-gray">Available 24/7</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="mt-4 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-xs text-charcoal-gray/60">
                            <span>☕</span>
                            <span className="font-medium">Quality • Innovation • Trust</span>
                            <span>☕</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;