import React, { useState, useEffect } from 'react';
import { submitEnquiry } from '../services/enquiryService';
import type { EnquiryData } from '../services/enquiryService';

interface ProductEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productSlug: string;
  quantity: number;
}

const ProductEnquiryModal: React.FC<ProductEnquiryModalProps> = ({
  isOpen,
  onClose,
  productName,
  productSlug,
  quantity
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    roleType: '',
    message: ''
  });

  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => {
            console.log('Location access denied');
          }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateMobile = (mobile: string) => /^\d{10}$/.test(mobile);
  const validateEmail = (email: string) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) return setError('Name is required');
    if (!formData.mobile.trim()) return setError('Mobile number is required');
    if (!validateMobile(formData.mobile)) return setError('Enter a valid 10-digit mobile number');
    if (formData.email && !validateEmail(formData.email)) return setError('Enter a valid email address');

    setIsLoading(true);

    const payload: EnquiryData = {
      ...formData,
      productName,
      productSlug,
      quantity,
      cartItems: [
        {
          productName,
          productSlug,
          quantity
        }
      ],
      source: 'Website Product Enquiry',
      pageUrl: window.location.href,
      createdFrom: 'Product Details Popup',
      latitude: location.lat,
      longitude: location.lng
    };

    try {
      await submitEnquiry(payload);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: '',
          mobile: '',
          email: '',
          city: '',
          state: '',
          roleType: '',
          message: ''
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to send enquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <iconify-icon icon="solar:close-circle-linear" width="28"></iconify-icon>
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side: Product Info Placeholder/Visual */}
          <div className="hidden md:flex w-1/3 bg-neutral-50 p-10 flex-col justify-between border-r border-neutral-100">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">Enquiry For</p>
              <h3 className="text-2xl font-normal text-neutral-900 leading-tight mb-4 uppercase tracking-tighter" style={{ fontFamily: "'Marcellus', serif" }}>
                {productName}
              </h3>
              <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-widest">
                  Qty: {quantity}
                </span>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white mb-4">
                <iconify-icon icon="solar:letter-unread-linear" width="24"></iconify-icon>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Our experts will review your requirement for <span className="font-bold text-neutral-900">{productName}</span> and contact you with the best price.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="flex-1 p-8 md:p-12 max-h-[90vh] overflow-y-auto">
            {!success ? (
              <>
                <div className="mb-10 lg:hidden">
                   <h3 className="text-xl font-normal text-neutral-900 mb-1 uppercase tracking-tight" style={{ fontFamily: "'Marcellus', serif" }}>
                    {productName}
                  </h3>
                   <span className="text-[10px] uppercase tracking-widest text-neutral-400">Qty: {quantity}</span>
                </div>

                <div className="mb-10">
                  <h2 className="text-3xl font-normal text-neutral-900 mb-2" style={{ fontFamily: "'Marcellus', serif" }}>Get a Quote.</h2>
                  <p className="text-sm text-neutral-500 font-light">Enter your details and our team will get in touch.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs animate-in slide-in-from-top-2 duration-300">
                       <p className="font-bold mb-1">Error</p>
                       <p>{error}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name *</label>
                      <input 
                        type="text" id="name" required 
                        value={formData.name} onChange={handleChange}
                        className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none transition-colors placeholder:text-neutral-300" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="mobile" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Mobile Number *</label>
                      <input 
                        type="tel" id="mobile" required maxLength={10}
                        value={formData.mobile} onChange={handleChange}
                        className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none transition-colors placeholder:text-neutral-300" 
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
                      <input 
                        type="email" id="email"
                        value={formData.email} onChange={handleChange}
                        className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none transition-colors placeholder:text-neutral-300" 
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="roleType" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">I am a...</label>
                      <select 
                        id="roleType" required
                        value={formData.roleType} onChange={handleChange}
                        className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none cursor-pointer appearance-none"
                      >
                        <option value="" disabled hidden>Select Role</option>
                        <option value="Dealer">Dealer</option>
                        <option value="Painter">Painter</option>
                        <option value="Contractor">Contractor</option>
                        <option value="Builder">Builder</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">City</label>
                      <input 
                        type="text" id="city" 
                        value={formData.city} onChange={handleChange}
                        className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none transition-colors placeholder:text-neutral-300" 
                        placeholder="Your City"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="state" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">State</label>
                      <input 
                        type="text" id="state" 
                        value={formData.state} onChange={handleChange}
                        className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none transition-colors placeholder:text-neutral-300" 
                        placeholder="Your State"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400">Requirements / Message</label>
                    <textarea 
                      id="message" rows={2}
                      value={formData.message} onChange={handleChange}
                      className="w-full border-b border-neutral-200 bg-transparent py-2 text-neutral-900 focus:border-neutral-950 focus:outline-none transition-colors placeholder:text-neutral-300 resize-none" 
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`w-full py-5 rounded-full bg-neutral-900 text-white uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800 active:scale-95'}`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <span>Processing...</span>
                        </div>
                      ) : 'Confirm Enquiry'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-8">
                  <iconify-icon icon="solar:check-circle-bold-duotone" width="48"></iconify-icon>
                </div>
                <h3 className="text-3xl font-normal text-neutral-900 mb-4 uppercase tracking-tighter" style={{ fontFamily: "'Marcellus', serif" }}>
                  Thank You.
                </h3>
                <p className="text-neutral-500 font-light max-w-sm leading-relaxed mb-10">
                  Your enquiry for <span className="font-bold text-neutral-900">{productName}</span> has been received. Our technical team will reach out to you shortly.
                </p>
                <div className="w-12 h-px bg-neutral-200"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEnquiryModal;
