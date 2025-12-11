import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RelationshipType, ProposalStyle, ProposalData } from '../types';
import { STYLE_OPTIONS, TEMPLATES } from '../constants';

interface GeneratorProps {
  setSharedData: (data: ProposalData) => void;
}

const Generator: React.FC<GeneratorProps> = ({ setSharedData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<ProposalData>({
    senderName: '',
    recipientName: '',
    relationshipType: null,
    style: ProposalStyle.SWEET,
    customMessage: '',
    image: undefined,
    musicEnabled: true,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsTransitioning(false);
    }, 400);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(prev => prev - 1);
      setIsTransitioning(false);
    }, 400);
  };

  const updateField = (field: keyof ProposalData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Please upload an image under 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        updateField('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    // Generate the message if not custom
    let finalMessage = formData.customMessage;
    if (formData.style !== ProposalStyle.CUSTOM) {
        finalMessage = TEMPLATES[formData.style](formData.senderName, formData.recipientName);
    }
    
    setSharedData({
        ...formData,
        customMessage: finalMessage
    });
    
    navigate('/preview');
  };

  // Dynamic Styles based on Context
  const getThemeColors = () => {
    if (formData.relationshipType === RelationshipType.ROMANTIC) {
      return {
        primary: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-500 hover:bg-rose-600',
        border: 'border-rose-200 dark:border-rose-800',
        ring: 'focus:ring-rose-500'
      };
    }
    return {
      primary: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-500 hover:bg-teal-600',
      border: 'border-teal-200 dark:border-teal-800',
      ring: 'focus:ring-teal-500'
    };
  };

  const theme = getThemeColors();

  // Step 1: Context Selection
  const renderStep1 = () => (
    <div className="space-y-8 text-center animate-fade-in">
      <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">What's your story?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <button
          onClick={() => {
            updateField('relationshipType', RelationshipType.ROMANTIC);
            updateField('style', ProposalStyle.SWEET);
            handleNext();
          }}
          className="group relative p-8 glass-card rounded-2xl transition-all duration-300 hover:scale-105 hover:border-rose-400 dark:hover:border-rose-500 text-left"
        >
          <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">🌹</div>
          <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-100 mb-2">Romantic Proposal</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">For your boyfriend, girlfriend, or partner. Filled with passion and love.</p>
        </button>

        <button
          onClick={() => {
            updateField('relationshipType', RelationshipType.FRIENDSHIP);
            updateField('style', ProposalStyle.FRIENDSHIP_FIRST);
            handleNext();
          }}
          className="group relative p-8 glass-card rounded-2xl transition-all duration-300 hover:scale-105 hover:border-teal-400 dark:hover:border-teal-500 text-left"
        >
          <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">🤝</div>
          <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-100 mb-2">Friendship to More</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">For your best friend or soulmate. Warm, sincere, and fun.</p>
        </button>
      </div>
    </div>
  );

  // Step 2: Details
  const renderStep2 = () => (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      <h2 className={`text-2xl font-serif font-bold text-center ${theme.primary}`}>Who is this for?</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
          <input
            type="text"
            value={formData.senderName}
            onChange={(e) => updateField('senderName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${theme.border} focus:outline-none focus:ring-2 ${theme.ring} backdrop-blur-sm transition-all`}
            placeholder="e.g. Alex"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Their Name</label>
          <input
            type="text"
            value={formData.recipientName}
            onChange={(e) => updateField('recipientName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${theme.border} focus:outline-none focus:ring-2 ${theme.ring} backdrop-blur-sm transition-all`}
            placeholder="e.g. Sam"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button onClick={handleBack} className="px-6 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Back</button>
        <button
          disabled={!formData.senderName || !formData.recipientName}
          onClick={handleNext}
          className={`px-8 py-2 text-white rounded-full shadow-lg ${theme.bg} disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
        >
          Next Step
        </button>
      </div>
    </div>
  );

  // Step 3: Style & Content
  const renderStep3 = () => (
    <div className="space-y-6 max-w-2xl mx-auto animate-fade-in">
      <h2 className={`text-2xl font-serif font-bold text-center ${theme.primary}`}>Choose the Vibe</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {formData.relationshipType && STYLE_OPTIONS[formData.relationshipType].map((style) => (
          <button
            key={style}
            onClick={() => updateField('style', style)}
            className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
              formData.style === style
                ? `${theme.bg} text-white shadow-md transform scale-105`
                : 'bg-white/40 dark:bg-slate-800/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-slate-700/60'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {formData.style === ProposalStyle.CUSTOM ? 'Write your message:' : 'Preview message (editable):'}
        </label>
        <textarea
          rows={5}
          value={formData.style === ProposalStyle.CUSTOM ? formData.customMessage : TEMPLATES[formData.style](formData.senderName || 'Me', formData.recipientName || 'You')}
          onChange={(e) => updateField('customMessage', e.target.value)}
          readOnly={formData.style !== ProposalStyle.CUSTOM}
          className={`w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border ${theme.border} focus:outline-none focus:ring-2 ${theme.ring} backdrop-blur-sm transition-all font-serif italic text-lg`}
        />
        {formData.style !== ProposalStyle.CUSTOM && (
           <p className="text-xs text-gray-500 mt-1">*Select 'Custom' to write your own message from scratch.</p>
        )}
      </div>

      <div className="pt-4 flex justify-between">
        <button onClick={handleBack} className="px-6 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400">Back</button>
        <button onClick={handleNext} className={`px-8 py-2 text-white rounded-full shadow-lg ${theme.bg} transition-all`}>Next Step</button>
      </div>
    </div>
  );

  // Step 4: Photo & Finalize
  const renderStep4 = () => (
    <div className="space-y-6 max-w-xl mx-auto animate-fade-in">
      <h2 className={`text-2xl font-serif font-bold text-center ${theme.primary}`}>Add a Memory</h2>
      
      <div className="flex flex-col items-center justify-center w-full">
        <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-white/10 transition-colors ${theme.border} ${previewImage ? 'border-solid' : ''}`}>
          {previewImage ? (
            <div className="relative w-full h-full overflow-hidden rounded-2xl group">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">Click to Change</span>
                </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <i className="fas fa-cloud-upload-alt text-4xl mb-3 text-gray-400"></i>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WEBP (MAX. 5MB)</p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      <div className="pt-8 flex justify-between">
        <button onClick={handleBack} className="px-6 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400">Back</button>
        <button
          onClick={handleGenerate}
          className={`group relative px-10 py-3 text-white font-bold rounded-full shadow-xl ${theme.bg} overflow-hidden`}
        >
           <span className="relative z-10 flex items-center gap-2">
             Reveal Proposal <i className="fas fa-heart animate-pulse"></i>
           </span>
           <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12">
      <div className="max-w-4xl mx-auto w-full px-4">
        {/* Progress Bar */}
        <div className="mb-12">
            <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`flex flex-col items-center w-1/4 ${step >= i ? theme.primary : 'text-gray-300 dark:text-gray-700'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= i ? `${theme.bg} text-white border-transparent` : 'border-current bg-transparent'}`}>
                            {step > i ? <i className="fas fa-check text-xs"></i> : i}
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-500 ease-out ${theme.bg}`} 
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Content */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default Generator;