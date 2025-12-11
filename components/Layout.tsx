import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Generator', path: '/create' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Tips', path: '/tips' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 transition-colors duration-700 bg-gradient-to-br from-rose-50 via-white to-sky-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float dark:bg-purple-600/20"></div>
          <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-sky-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float delay-1000 dark:bg-blue-600/20"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float delay-2000 dark:bg-rose-900/20"></div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-3xl animate-pulse-slow">✨</span>
              <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-300 dark:to-purple-300">
                Lumière
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-rose-500 dark:hover:text-rose-300 ${
                    isActive(link.path) ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <i className="fas fa-sun text-amber-400 text-xl"></i>
                ) : (
                  <i className="fas fa-moon text-indigo-600 text-xl"></i>
                )}
              </button>
              
              <button 
                className="md:hidden p-2 text-gray-700 dark:text-gray-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path) 
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-8 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-2">Lumière</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Crafting perfect moments for every relationship.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <a 
                href="https://instagram.com/tanzeelahmedpov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-rose-500 transition-colors transform hover:scale-110"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a 
                href="https://twitter.com/TanzeelONX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/tanzeel-ahmed-b21288397/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-700 transition-colors transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Lumière.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Made with <span className="text-rose-500 animate-pulse">❤️</span> by Tanzeel Ahmed
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;