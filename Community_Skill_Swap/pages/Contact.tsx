import React, { useState } from 'react';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Contact: React.FC = () => {
    const { currentUser } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    
    // Pre-fill form if user is logged in
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1000);
    };

    return (
        <section id="contact" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-fnbDark">Contact Us</h2>
                
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-fnbDark">About Community Skill Swap</h3>
                        <p className="text-gray-700 mb-4">Community Skill Swap connects people who want to share their knowledge and learn new skills. Our platform is completely free and based on the principle of mutual exchange.</p>
                        <p className="text-gray-700 mb-6">Founded in 2023, we've helped thousands of people connect, learn, and grow together. Whether you're looking to share your expertise or learn something new, our community is here to support you.</p>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="bg-fnbLight text-white w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-fnbDark">Email Us</h4>
                                    <p className="text-gray-600">hello@skills-swap.co.za</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-fnbLight text-white w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-fnbDark">Visit Us</h4>
                                    <p className="text-gray-600">123 Community Street, Cape Town, 8001</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-fnbDark">Send Us a Message</h3>
                        {submitted ? (
                            <div className="text-center py-8 px-4 bg-fnbAccent rounded-lg">
                                <h2 className="text-2xl font-bold text-fnbDark">Message Sent!</h2>
                                <p className="mt-3 text-gray-700">Thanks for reaching out. We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input id="contact-name" name="name" label="Your Name" type="text" value={formData.name} onChange={handleChange} required />
                                <Input id="contact-email" name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
                                <Input id="contact-subject" name="subject" label="Subject" type="text" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
                                <Textarea id="contact-message" name="message" label="Message" value={formData.message} onChange={handleChange} placeholder="Your message" required />
                                <Button type="submit" isLoading={isSubmitting} className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;