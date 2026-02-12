
import React, { useState, useCallback } from 'react';
import { Wand2, Store, MessageSquareQuote, Info, Sparkles, History } from 'lucide-react';
import StarRating from './components/StarRating';
import MetricToggle from './components/MetricToggle';
import GeneratedReview from './components/GeneratedReview';
import { METRICS, TONES } from './constants';
import { Tone, ReviewRequest, GeneratedReviewData } from './types';
import { generateReview } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedReviewData[]>([]);
  
  // Form State
  const [businessName, setBusinessName] = useState('');
  const [rating, setRating] = useState(5);
  const [tone, setTone] = useState<Tone>(Tone.ENTHUSIASTIC);
  const [metrics, setMetrics] = useState<Record<string, 'positive' | 'negative' | 'neutral'>>(
    METRICS.reduce((acc, m) => ({ ...acc, [m.id]: 'neutral' }), {})
  );
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [generatedResult, setGeneratedResult] = useState<{ title: string; content: string } | null>(null);

  const handleMetricChange = (id: string, status: 'positive' | 'negative' | 'neutral') => {
    setMetrics(prev => ({ ...prev, [id]: status }));
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!businessName.trim()) {
      setError("Please enter a business name.");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const request: ReviewRequest = {
        businessName,
        rating,
        tone,
        metrics,
        additionalDetails
      };
      
      const result = await generateReview(request);
      setGeneratedResult(result);
      
      // Add to history
      setHistory(prev => [{
        ...result,
        timestamp: Date.now()
      }, ...prev].slice(0, 5)); // Keep last 5
      
    } catch (err) {
      setError("Something went wrong. Please check your configuration.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBusinessName('');
    setRating(5);
    setTone(Tone.ENTHUSIASTIC);
    setMetrics(METRICS.reduce((acc, m) => ({ ...acc, [m.id]: 'neutral' }), {}));
    setAdditionalDetails('');
    setGeneratedResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Review Genie
            </h1>
          </div>
          <button 
            onClick={resetForm}
            className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Start Over
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <Store className="text-indigo-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Business Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    What's the name of the place?
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Blue Bottle Coffee, Central Park"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Overall Rating
                  </label>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <Wand2 className="text-indigo-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Review Metrics</h2>
                <p className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                  <Info size={12} /> Click to cycle status
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {METRICS.map((metric) => (
                  <MetricToggle
                    key={metric.id}
                    metric={metric}
                    status={metrics[metric.id]}
                    onChange={handleMetricChange}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquareQuote className="text-indigo-600" size={20} />
                <h2 className="text-lg font-bold text-slate-800">Tone & Context</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Select a Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTone(t)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          tone === t
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Anything specific to mention? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={additionalDetails}
                    onChange={(e) => setAdditionalDetails(e.target.value)}
                    placeholder="e.g. The barista was super friendly, but the table was a bit wobbly."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
                <Info size={16} />
                {error}
              </div>
            )}

            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all ${
                loading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  Generate Review
                </>
              )}
            </button>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-5 space-y-6">
            {!generatedResult && !loading && (
              <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="bg-white p-4 rounded-full shadow-lg mb-4 text-indigo-500">
                  <Wand2 size={48} />
                </div>
                <h3 className="text-xl font-bold text-indigo-900 mb-2">Ready to conjure?</h3>
                <p className="text-indigo-700 max-w-xs mx-auto">
                  Fill in the details on the left and hit "Generate Review" to see the magic happen.
                </p>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px] animate-pulse">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-150"></div>
                </div>
                <p className="text-slate-500 font-medium">Genie is thinking...</p>
              </div>
            )}

            {generatedResult && !loading && (
              <GeneratedReview
                title={generatedResult.title}
                content={generatedResult.content}
                onRegenerate={() => handleGenerate()}
              />
            )}

            {history.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <History size={18} className="text-slate-400" />
                  <h3 className="font-bold text-slate-700">Recent Sessions</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGeneratedResult({ title: item.title, content: item.content })}
                      className="w-full px-6 py-4 text-left hover:bg-slate-50 transition-colors group"
                    >
                      <p className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600">{item.title}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-4 text-center mt-12 mb-8 text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Review Genie • AI-Powered Reviews</p>
      </footer>
    </div>
  );
};

export default App;
