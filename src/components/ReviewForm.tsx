import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, Check, Calendar } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { ReviewType } from '../types';

export default function ReviewForm() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [projectType, setProjectType] = useState<string>('Flat & Home Interiors');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vs_arch_reviews');
      if (stored) {
        setReviews(JSON.parse(stored));
      } else {
        setReviews(INITIAL_REVIEWS);
      }
    } catch (e) {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!userName.trim()) {
      setErrorMessage('Please include your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('Please write a brief client review.');
      return;
    }

    const newReview: ReviewType = {
      id: `rev-local-${Date.now()}`,
      name: userName,
      rating,
      comment,
      projectType,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    try {
      localStorage.setItem('vs_arch_reviews', JSON.stringify(updatedReviews));
    } catch (e) {
      // Silently swallow third-party storage restrictions inside sandboxed frames
    }

    // Reset Form States
    setUserName('');
    setRating(5);
    setComment('');
    setIsSubmitSuccess(true);
    setTimeout(() => setIsSubmitSuccess(false), 3000);
  };

  return (
    <div id="review-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-zinc-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 transition-colors duration-300">
      
      {/* Testimonials Stream */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-xl font-serif text-slate-800 dark:text-zinc-100">
            Client <em>Testimonials</em>
          </h3>
        </div>

        <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
          {reviews.length === 0 ? (
            <p className="text-slate-500 text-xs italic">No reviews yet. Be the first to share your experience!</p>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-zinc-200 text-xs">
                      {rev.name}
                    </h4>
                    <span className="inline-block px-2 py-0.5 bg-stone dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-mono text-[9px] rounded-full mt-1">
                      {rev.projectType}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5 justify-end">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-3 h-3 ${
                            starIdx < rev.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-zinc-300 dark:text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400 block mt-1 flex items-center justify-end gap-1 font-mono">
                      <Calendar className="w-2.5 h-2.5" /> {rev.date}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-sans mt-2 italic">
                  "{rev.comment}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Leave a review portal Form */}
      <div className="lg:col-span-5 bg-white dark:bg-zinc-950 border border-slate-200/60 dark:border-zinc-850 p-5 rounded-2xl relative shadow-sm">
        <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
          LEAVE AN HONEST RATING
        </h4>

        {isSubmitSuccess ? (
          <div className="absolute inset-0 bg-white/95 dark:bg-zinc-950/95 rounded-2xl flex flex-col justify-center items-center text-center p-6 z-10">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h5 className="font-serif text-lg text-slate-900 dark:text-zinc-100">Review Submitted</h5>
            <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-[200px] mt-2">
              Thank you! Your verified testimonial was appended to our public index.
            </p>
          </div>
        ) : null}

        <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans">
          
          {/* User Name input */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-zinc-400 block">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Chandra"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-2.5 outline-none focus:border-amber-600 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-zinc-100"
            />
          </div>

          {/* Rating Choice */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-zinc-400 block">
              Project Rating
            </label>
            <div className="flex gap-1 pt-1">
              {Array.from({ length: 5 }).map((_, idx) => {
                const currentStar = idx + 1;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRating(currentStar)}
                    className="p-1 hover:scale-110 transition-all text-amber-500"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        currentStar <= rating ? 'fill-amber-500' : 'text-zinc-350 dark:text-zinc-800'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project category selection */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-zinc-400 block">
              Work Completed
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-2.5 outline-none focus:border-amber-500 transition-all text-slate-800 dark:text-zinc-150"
            >
              <option>Flat & Home Interiors</option>
              <option>Bespoke Bedroom Architecture</option>
              <option>Smart Kitchen Interior</option>
              <option>Small Office Interiors</option>
              <option>Lush Garden Design</option>
              <option>Complete Architectural Consultation</option>
            </select>
          </div>

          {/* Comment text */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-zinc-400 block">
              Detailed Experience
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tell us about the craftsmanship, spatial layouts, timing, and responsiveness..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-2.5 outline-none focus:border-amber-600 dark:focus:border-amber-500 transition-all text-slate-800 dark:text-zinc-100 resize-none"
            />
          </div>

          {errorMessage && (
            <p className="text-[11px] text-red-500 font-medium italic">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-lg py-2.5 px-4 font-mono font-semibold text-xs transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Submit Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}
