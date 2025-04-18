// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-4 px-4"> {/* Reduced padding */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Reduced gap */}
          {/* About Section */}
          <div>
            <h3 className="text-md font-semibold mb-2">About Todo App</h3> {/* Smaller heading */}
            <p className="text-gray-300 text-xs">
              A simple yet powerful task management application to help you stay organized, 
              focused, and productive throughout your day.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-2">Quick Links</h3> {/* Smaller heading */}
            <ul className="space-y-1 text-xs"> {/* Reduced space between items */}
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Privacy Policy</a>
              </li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div>
            <h3 className="text-md font-semibold mb-2">Connect With Us</h3> {/* Smaller heading */}
            <div className="flex space-x-3 mb-3"> {/* Reduced space between icons */}
              {/* Social Media Icons */}
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-300">
              Get in touch at <a href="mailto:support@todoapp.com" className="text-blue-400 hover:underline">support@todoapp.com</a>
            </p>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center text-xs text-gray-400"> {/* Reduced padding and text size */}
          <p>&copy; {currentYear} Todo App. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for productivity enthusiasts</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
