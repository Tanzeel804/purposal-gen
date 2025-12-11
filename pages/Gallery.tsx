import React from 'react';

const Gallery: React.FC = () => {
  const examples = [
    { title: "Paris Night", type: "Romantic", color: "bg-rose-100 dark:bg-rose-900" },
    { title: "Besties Forever", type: "Friendship", color: "bg-teal-100 dark:bg-teal-900" },
    { title: "Golden Hour", type: "Romantic", color: "bg-amber-100 dark:bg-amber-900" },
    { title: "Movie Night", type: "Romantic", color: "bg-purple-100 dark:bg-purple-900" },
    { title: "Adventure Awaits", type: "Friendship", color: "bg-emerald-100 dark:bg-emerald-900" },
    { title: "Classic Love", type: "Romantic", color: "bg-red-100 dark:bg-red-900" },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Inspiration Gallery</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Explore stunning proposal styles created by our community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {examples.map((item, idx) => (
          <div key={idx} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg cursor-pointer">
            <div className={`absolute inset-0 ${item.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                    <i className={`fas ${item.type === 'Romantic' ? 'fa-heart' : 'fa-star'} text-2xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">{item.title}</h3>
                <span className="mt-2 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-gray-800 dark:text-white uppercase tracking-wide">{item.type}</span>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Use This Style
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;