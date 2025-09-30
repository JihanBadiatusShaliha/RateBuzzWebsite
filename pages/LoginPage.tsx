import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Fix: Specify the event type as React.FormEvent<HTMLFormElement> to correctly type e.currentTarget.
  // This ensures that e.currentTarget is recognized as an HTMLFormElement, allowing it to be used
  // with the FormData constructor without a type error.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd have validation and an API call here.
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    login(email);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 bg-cover bg-center" style={{backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-70472229999e/36599b53-4283-42e0-8458-368c5b965f42/ID-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg)'}}>
        <div className="absolute inset-0 bg-slate-900 bg-opacity-60"></div>
        <div className="w-full max-w-md z-10">
            <div className="bg-slate-900 bg-opacity-80 shadow-2xl rounded-lg p-8 sm:p-12 mb-4">
                <h1 className="text-3xl font-bold text-white mb-6">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </h1>
          
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                        <input
                            className="shadow appearance-none rounded w-full py-3 px-4 bg-slate-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                        />
                        </div>
                    )}
                    <div>
                        <input
                            className="shadow appearance-none rounded w-full py-3 px-4 bg-slate-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="shadow appearance-none rounded w-full py-3 px-4 bg-slate-800 text-white mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
                        type="submit"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        {isLogin ? "New to RateBuzz? " : "Already have an account? "}
                        <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-bold text-white hover:underline"
                        >
                        {isLogin ? 'Sign up now.' : 'Sign in.'}
                        </button>
                    </p>
                </div>
            </div>
      </div>
    </div>
  );
};

export default LoginPage;