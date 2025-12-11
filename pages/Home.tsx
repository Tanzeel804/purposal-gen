import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
      
      {/* Hero Section */}
      <div className="space-y-8 animate-fade-in relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-rose-400 to-purple-500 rounded-full blur-[100px] opacity-20 -z-10 animate-pulse-slow"></div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
          Create the Perfect <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600 dark:from-rose-400 dark:to-purple-400">
            Proposal Moment
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 font-light">
          Whether it's a soulmate or a best friend, design a stunning, personalized digital proposal that captures your unique story.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/create"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-rose-600 rounded-full hover:bg-rose-700 hover:scale-105 shadow-lg shadow-rose-500/30 overflow-hidden"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative flex items-center gap-2">
              Start Designing <i className="fas fa-magic"></i>
            </span>
          </Link>
          
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-rose-600 dark:text-rose-300 transition-all duration-300 bg-white dark:bg-slate-800 border-2 border-rose-200 dark:border-rose-900/50 rounded-full hover:bg-rose-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md"
          >
            View Examples
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <div className="glass-card p-8 rounded-2xl hover:translate-y-[-5px] transition-transform duration-300">
          <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400 text-2xl">
            <i className="fas fa-adjust"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Dual Modes</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Switch effortlessly between a romantic light theme and a sophisticated dark mode.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl hover:translate-y-[-5px] transition-transform duration-300">
          <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 text-2xl">
            <i className="fas fa-heart"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Smart Context</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tailored experiences for romantic partners or best friends. The vibe adapts to you.
          </p>
        </div>

        <div className="glass-card p-8 rounded-2xl hover:translate-y-[-5px] transition-transform duration-300">
          <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mb-6 text-sky-600 dark:text-sky-400 text-2xl">
            <i className="fas fa-image"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Photo Integration</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your memories with beautiful frames and filters to make it truly personal.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Home;