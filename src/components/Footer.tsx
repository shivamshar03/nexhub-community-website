import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/OtherImages/logo.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Mock subscription - in a real app, you'd call an API here
    setSubscribed(true);
    setEmail('');
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main footer content - 12 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo and description - spans 3 columns on large screens */}
          <div className="lg:col-span-3 sm:col-span-2 col-span-1">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="NexHub Logo" className="h-12 w-auto" />
              <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">NEXHUB</span>
            </Link>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-300 pr-4">
              Empowering tech enthusiasts, one event at a time! Join our community of developers, designers, and innovators.
            </p>
          </div>
          
          {/* Quick Links - spans 2 columns */}
          <div className="lg:col-span-2 sm:col-span-1 col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider pb-2 border-b border-gray-200 dark:border-gray-700">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light">
                  About
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Community Links - spans 2 columns */}
          <div className="lg:col-span-2 sm:col-span-1 col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider pb-2 border-b border-gray-200 dark:border-gray-700">
              Community
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/team" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media - spans 2 columns */}
          <div className="lg:col-span-2 sm:col-span-2 col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider pb-2 border-b border-gray-200 dark:border-gray-700">
              Connect
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <a 
                href="https://www.linkedin.com/in/nexhubcommunity/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white dark:bg-gray-700 dark:hover:bg-blue-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/nexhubcommunity/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-pink-500 hover:text-white dark:bg-gray-700 dark:hover:bg-pink-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/channel/UCUHmRuQ9ELLTC9lVeTtEQpw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white dark:bg-gray-700 dark:hover:bg-red-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://chat.whatsapp.com/IrfYbZfyJGrF3KuPiM8ElH" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white dark:bg-gray-700 dark:hover:bg-green-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Newsletter - spans 3 columns */}
          <div className="lg:col-span-3 sm:col-span-2 col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 uppercase tracking-wider pb-2 border-b border-gray-200 dark:border-gray-700">
              Newsletter
            </h3>
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Subscribe to get updates on events and opportunities
              </p>
              {subscribed ? (
                <div className="p-3 bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 rounded-md">
                  Thanks for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div>
                    <label htmlFor="email-input" className="sr-only">Email address</label>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                      required
                    />
                    {error && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:bg-primary-light dark:hover:bg-primary-light/90"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} NexHub Community. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
