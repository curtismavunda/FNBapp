import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
    categories: string[];
}

const Footer: React.FC<FooterProps> = ({ categories }) => {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
    };

    return (
        <footer className="bg-fnbDark text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Community Skill Swap</h3>
                        <p className="text-fnbLight">Connecting people through skill sharing since 2023.</p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-fnbLight hover:text-white transition">Home</Link></li>
                            <li><Link to="/skills" className="text-fnbLight hover:text-white transition">Skills Directory</Link></li>
                            <li><Link to="/offer" className="text-fnbLight hover:text-white transition">Offer a Skill</Link></li>
                            <li><Link to="/contact" className="text-fnbLight hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Categories</h4>
                        <ul className="space-y-2">
                           {categories.map(cat => (
                               <li key={cat}><Link to={`/skills?category=${cat}`} className="text-fnbLight hover:text-white transition">{cat}</Link></li>
                           ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-fnbLight text-fnbDark w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="bg-fnbLight text-fnbDark w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="bg-fnbLight text-fnbDark w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="bg-fnbLight text-fnbDark w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <p className="mt-4 text-fnbLight">Subscribe to our newsletter</p>
                        <form onSubmit={handleNewsletterSubmit} className="mt-2 flex">
                            <input type="email" className="px-4 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none" placeholder="Your email" required/>
                            <button type="submit" className="bg-fnbLight text-fnbDark px-4 py-2 rounded-r-lg font-bold hover:bg-opacity-90 transition">Join</button>
                        </form>
                    </div>
                </div>
                
                <div className="border-t border-fnbLight mt-12 pt-8 text-center text-fnbLight">
                    <p>created by: Curtis Mavunda</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;