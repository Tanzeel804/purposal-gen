import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProposalData, RelationshipType } from '../types';
import Confetti from 'react-confetti';

interface PreviewProps {
  data: ProposalData;
}

const Preview: React.FC<PreviewProps> = ({ data: initialData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [data, setData] = useState<ProposalData>(initialData);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  // Load data from URL if not provided via props (allows sharing)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const encodedData = searchParams.get('d');
    
    if (encodedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
        setData(decoded);
      } catch (e) {
        console.error("Failed to decode proposal data", e);
      }
    } else if (!initialData.recipientName) {
      // If no data in props AND no data in URL, redirect to create
      navigate('/create');
    } else {
        setData(initialData);
    }

    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialData, navigate, location.search]);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowConfetti(true), 500);
  };

  const handleYes = () => {
    setAccepted(true);
    setShowConfetti(true); // Ensure confetti runs
    // Scroll to center
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    // Encode data into URL
    const jsonString = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(jsonString)); // Base64 encode
    // Construct URL: Base URL + /#/preview?d=DATA
    const shareableUrl = `${window.location.origin}${window.location.pathname}#/preview?d=${encoded}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `A special question for ${data.recipientName}`,
          text: `I have a question for you...`,
          url: shareableUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(shareableUrl);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } catch (err) {
        setCopyStatus('error');
      }
    }
  };

  const isRomantic = data.relationshipType === RelationshipType.ROMANTIC;
  
  // Theme Config based on relationship
  const theme = isRomantic ? {
    bg: 'from-rose-100 to-pink-200 dark:from-rose-950 dark:to-purple-950',
    card: 'bg-white/90 dark:bg-slate-900/90',
    accent: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-300 dark:border-rose-700',
    button: 'bg-rose-500 hover:bg-rose-600',
    buttonSuccess: 'bg-green-500 hover:bg-green-600',
    icon: 'fa-heart'
  } : {
    bg: 'from-sky-100 to-teal-200 dark:from-slate-900 dark:to-teal-950',
    card: 'bg-white/90 dark:bg-slate-900/90',
    accent: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-300 dark:border-teal-700',
    button: 'bg-teal-500 hover:bg-teal-600',
    buttonSuccess: 'bg-green-500 hover:bg-green-600',
    icon: 'fa-star'
  };

  if (!data.recipientName) return null;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br ${theme.bg}`}>
      {(showConfetti || accepted) && (
        <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            colors={isRomantic ? ['#e11d48', '#f43f5e', '#fb7185', '#ffd4d8'] : ['#0d9488', '#14b8a6', '#5eead4', '#ccfbf1']}
            recycle={accepted} // Loop confetti if accepted
            numberOfPieces={accepted ? 200 : 500}
            gravity={accepted ? 0.05 : 0.1}
        />
      )}

      {/* The Envelope / Card Container */}
      <div className={`relative w-full max-w-lg perspective-1000 transition-all duration-1000 ${isOpen ? 'scale-100' : 'cursor-pointer hover:scale-105'}`} onClick={!isOpen ? handleOpen : undefined}>
        
        {/* Closed State - Envelope */}
        {!isOpen && (
          <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-8 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 animate-float">
            <div className={`text-6xl mb-4 ${theme.accent}`}>
              <i className="fas fa-envelope"></i>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-2">A Message for {data.recipientName}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Tap to open</p>
            <div className={`inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${isRomantic ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' : 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'}`}>
              Special Delivery
            </div>
          </div>
        )}

        {/* Open State - The Proposal Card */}
        {isOpen && (
          <div className={`relative ${theme.card} backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border ${theme.border} animate-slide-up`}>
            {/* Decorative Header */}
            <div className={`h-2 w-full bg-gradient-to-r ${isRomantic ? 'from-rose-400 to-purple-500' : 'from-teal-400 to-blue-500'}`}></div>
            
            <div className="p-8 md:p-12 text-center space-y-6">
              
              {/* Content view when NOT accepted yet */}
              {!accepted ? (
                <>
                  {/* Relationship Icon */}
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-gray-50 dark:bg-white/5 shadow-inner ${theme.accent} text-3xl mb-4`}>
                    <i className={`fas ${theme.icon} animate-pulse-slow`}></i>
                  </div>

                  {/* Photo Area */}
                  {data.image && (
                    <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
                      <div className={`absolute inset-0 rounded-full border-4 ${theme.border} border-dashed opacity-50 animate-spin-slow`}></div>
                      <div className="absolute inset-2 rounded-full overflow-hidden shadow-lg border-2 border-white dark:border-gray-700">
                        <img src={data.image} alt="Us" className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className={`absolute -bottom-2 -right-2 text-2xl ${theme.accent}`}>✨</div>
                      <div className={`absolute -top-2 -left-2 text-2xl ${theme.accent}`}>✨</div>
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="space-y-4">
                    <h1 className="font-script text-5xl md:text-6xl text-gray-900 dark:text-white leading-tight">
                      {data.relationshipType === RelationshipType.ROMANTIC ? 'Will you be mine?' : 'Best Friends Forever?'}
                    </h1>
                    
                    <div className="relative py-6">
                      <i className={`fas fa-quote-left absolute top-0 left-0 text-2xl opacity-20 ${theme.accent}`}></i>
                      <p className="font-serif text-lg md:text-xl text-gray-700 dark:text-gray-200 italic leading-relaxed px-6 whitespace-pre-wrap">
                        {data.customMessage}
                      </p>
                      <i className={`fas fa-quote-right absolute bottom-0 right-0 text-2xl opacity-20 ${theme.accent}`}></i>
                    </div>

                    <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 pt-4">
                      With love, {data.senderName}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                     <button 
                       onClick={handleYes}
                       className={`flex-1 px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all ${theme.button}`}
                     >
                       YES! <i className="fas fa-check ml-2"></i>
                     </button>
                     
                     <button 
                      onClick={handleShare}
                      className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors relative"
                     >
                       {copyStatus === 'copied' ? (
                          <span className="text-green-600"><i className="fas fa-check mr-2"></i>Link Copied</span>
                       ) : (
                          <span><i className="fas fa-share-alt mr-2"></i> Share</span>
                       )}
                     </button>
                  </div>
                </>
              ) : (
                // SUCCESS STATE (AFTER CLICKING YES)
                <div className="animate-fade-in py-10">
                   <div className="text-6xl mb-6 animate-bounce">
                     {isRomantic ? '❤️' : '⭐'}
                   </div>
                   <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                     Woohoo! {isRomantic ? "It's a YES!" : "Friends Forever!"}
                   </h2>
                   <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                     {data.senderName} is going to be the happiest person in the world right now!
                   </p>
                   
                   <div className="p-6 bg-white/50 dark:bg-black/20 rounded-xl mb-8">
                     <p className="font-script text-3xl text-gray-800 dark:text-gray-100">
                       "Every love story is beautiful, but ours is my favorite."
                     </p>
                   </div>

                   <button 
                     onClick={() => {
                        window.open(`https://wa.me/?text=I%20said%20YES!%20${encodeURIComponent(window.location.href)}`, '_blank');
                     }}
                     className="px-8 py-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-lg"
                   >
                     <i className="fab fa-whatsapp mr-2"></i> Tell {data.senderName}
                   </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Back Button */}
      {!accepted && (
        <div className="absolute top-4 left-4 z-10">
          <button onClick={() => navigate('/')} className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/40 text-gray-800 dark:text-white backdrop-blur-md transition-all">
            <i className="fas fa-arrow-left mr-2"></i> Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Preview;