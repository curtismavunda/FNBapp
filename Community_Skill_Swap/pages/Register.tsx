import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to register.');
      setIsLoading(false);
    }
    // No need for finally block here because successful registration navigates away
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="max-w-md w-full bg-fnbAccent rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-fnbDark">Create an Account</h2>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input id="name" name="name" label="Full Name" type="text" value={formData.name} onChange={handleChange} required />
            <Input id="email" name="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
            <Input id="phone" name="phone" label="Phone Number (Optional)" type="tel" value={formData.phone} onChange={handleChange} />
            <Input id="password" name="password" label="Password" type="password" value={formData.password} onChange={handleChange} required />
            <Input id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            <Button type="submit" isLoading={isLoading} className="w-full">
              Register
            </Button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-fnbDark hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;