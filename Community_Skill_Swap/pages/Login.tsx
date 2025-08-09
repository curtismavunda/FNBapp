import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="max-w-md w-full bg-fnbAccent rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-fnbDark">Login</h2>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input id="email" name="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input id="password" name="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" isLoading={isLoading} className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-fnbDark hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;