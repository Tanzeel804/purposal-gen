import React from 'react';

const Tips: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Tips for the Perfect Moment</h1>
        <p className="text-gray-600 dark:text-gray-400">Expert advice on how to express your feelings with confidence.</p>
      </div>

      <div className="space-y-12">
        <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-4">1. Setting the Mood</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Lighting and ambiance are everything. Whether you're doing a digital proposal or a physical one, ensure the timing is right. For digital proposals, send the link when you know they are relaxed and free from distractions.
            </p>
        </section>

        <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">2. The "Right" Words</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Don't try to be Shakespeare if you're not. The most powerful proposals are honest. Mention specific memories, inside jokes, and exactly why they make your life better. Authenticity beats poetry every time.
            </p>
        </section>

        <section className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">3. For Friendships</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Proposing a transition from friends to partners is delicate. Emphasize that the friendship is the foundation. Use our "Friendship First" templates to gently bridge that gap without adding too much pressure.
            </p>
        </section>
      </div>
    </div>
  );
};

export default Tips;