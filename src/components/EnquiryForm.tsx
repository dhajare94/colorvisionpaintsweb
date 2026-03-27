import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { EnquiryData } from '../services/enquiryService';
import { submitEnquiry } from '../services/enquiryService';

interface EnquiryFormProps {
  source?: string;
  createdFrom?: string;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ 
  source = "Website", 
  createdFrom = "Website Enquiry Form" 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    roleType: '',
    productInterested: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile);
  };

  const validateEmail = (email: string) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Mobile number is required");
      return;
    }

    if (!validateMobile(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    const payload: EnquiryData = {
      ...formData,
      source,
      pageUrl: window.location.href,
      createdFrom
    };

    try {
      await submitEnquiry(payload);
      setSuccess(true);
      setFormData({
        name: '',
        mobile: '',
        email: '',
        city: '',
        state: '',
        roleType: '',
        productInterested: '',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (success) {
    return (
      <div className="text-center py-8 animate-in fade-in duration-700">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-4">
          <iconify-icon icon="solar:check-circle-bold-duotone" width="40"></iconify-icon>
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-1">Message Sent!</h3>
        <p className="text-sm text-neutral-600">Thank you for your inquiry. Our team will get back to you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-8 text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-70 transition-opacity"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="font-bold">Submission Error</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="relative group">
          <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300" 
            placeholder="John Doe" 
            required 
          />
        </div>
        <div className="relative group">
          <label htmlFor="mobile" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input 
            type="tel" 
            id="mobile" 
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300" 
            placeholder="9876543210" 
            maxLength={10}
            required 
          />
        </div>
        <div className="relative group">
          <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300" 
            placeholder="john@example.com" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="relative group">
          <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            City
          </label>
          <input 
            type="text" 
            id="city" 
            value={formData.city}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300" 
            placeholder="Your City" 
          />
        </div>
        <div className="relative group">
          <label htmlFor="state" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            State
          </label>
          <input 
            type="text" 
            id="state" 
            value={formData.state}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300" 
            placeholder="Your State" 
          />
        </div>
        <div className="relative group">
          <label htmlFor="roleType" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            I am a...
          </label>
          <select 
            id="roleType" 
            value={formData.roleType}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors appearance-none cursor-pointer"
            required
          >
            <option value="" disabled hidden>Select Role Type</option>
            <option value="Dealer">Dealer</option>
            <option value="Painter">Painter</option>
            <option value="Contractor">Contractor</option>
            <option value="Builder">Builder</option>
            <option value="Customer">Customer</option>
          </select>
          <iconify-icon icon="solar:alt-arrow-down-linear" className="absolute right-0 bottom-4 text-neutral-400 pointer-events-none"></iconify-icon>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="relative group">
          <label htmlFor="productInterested" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            Product Interested In
          </label>
          <input 
            type="text" 
            id="productInterested" 
            value={formData.productInterested}
            onChange={handleChange}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300" 
            placeholder="e.g. Hommate Distemper" 
          />
        </div>
        <div className="relative group">
          <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 transition-colors group-focus-within:text-neutral-900">
            Message
          </label>
          <textarea 
            id="message" 
            value={formData.message}
            onChange={handleChange}
            rows={1}
            className="w-full border-b border-neutral-300 bg-transparent py-2 text-neutral-900 focus:border-neutral-900 focus:outline-none transition-colors placeholder:text-neutral-300 resize-none" 
            placeholder="Tell us about..."
          ></textarea>
        </div>
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          disabled={isLoading}
          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-950 px-10 py-3 font-bold text-white transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800 active:scale-95'}`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs uppercase tracking-[0.2em]">Processing...</span>
            </div>
          ) : (
            <span className="relative z-10 text-xs uppercase tracking-[0.2em]">Send Inquiry</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;
