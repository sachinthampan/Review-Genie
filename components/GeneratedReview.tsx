
import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Share2 } from 'lucide-react';

interface GeneratedReviewProps {
  title: string;
  content: string;
  onRegenerate: () => void;
}

const GeneratedReview: React.FC<GeneratedReviewProps> = ({ title, content, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${title}\n\n${content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
        <h3 className="text-white font-semibold text-lg">Your Review Genie Result</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          <button
            onClick={onRegenerate}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            title="Regenerate"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-800 mb-3">{title}</h4>
        <div className="text-slate-600 leading-relaxed whitespace-pre-wrap italic border-l-4 border-indigo-200 pl-4 py-2 bg-slate-50 rounded-r-lg">
          "{content}"
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Copied!' : 'Copy Review Text'}
          </button>
          <button
            className="flex-1 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            Post Review
          </button>
        </div>
        <p className="mt-4 text-xs text-center text-slate-400">
          Feel free to edit this text before posting to platforms like Google, Yelp, or TripAdvisor.
        </p>
      </div>
    </div>
  );
};

export default GeneratedReview;
