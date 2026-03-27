import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/productData';
import type { Product } from '../types';
import ProductEnquiryModal from '../components/ProductEnquiryModal';

const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-normal text-neutral-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="text-neutral-500 hover:text-neutral-900 underline underline-offset-4 tracking-widest text-sm uppercase">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(q => q + 1);
    else if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  const handleSendEnquiry = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-12">
          <Link to="/products" className="group inline-flex items-center text-neutral-400 hover:text-neutral-900 transition-colors duration-300 gap-2 uppercase tracking-[0.2em] text-[10px] sm:text-xs">
            <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to Collection
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          {/* Left Side: Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square overflow-hidden bg-neutral-100 transition-all duration-300 ${activeImage === img ? 'opacity-100 ring-1 ring-neutral-900' : 'opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Info & Actions */}
          <div className="flex flex-col h-full py-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 mb-6 uppercase tracking-tight leading-[1.1]">
              {product.name}
            </h1>
            <div className="w-20 h-px bg-neutral-300 mb-8"></div>

            <p className="text-neutral-600 text-lg leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            <div className="space-y-8 mt-auto">
              {/* Quantity Selector */}
              <div className="flex items-center gap-6">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">Quantity</span>
                <div className="flex items-center border border-neutral-200">
                  <button
                    onClick={() => handleQuantityChange('dec')}
                    className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors border-r border-neutral-200"
                  >
                    —
                  </button>
                  <span className="w-16 text-center text-lg font-medium text-neutral-900 tracking-tighter tabular-nums px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('inc')}
                    className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors border-l border-neutral-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleSendEnquiry}
                  className="w-full py-5 bg-neutral-900 text-white uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 hover:bg-neutral-800 active:scale-[0.98]"
                >
                  Send Enquiry
                </button>
                <a
                  href={product.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-5 border border-neutral-900 text-neutral-900 uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 hover:bg-neutral-50 active:scale-[0.98]"
                >
                  Download Datasheet
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <section className="mb-24 pt-24 border-t border-neutral-100">
          <h2 className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-12 text-center font-bold">Technical Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            {product.specifications.map((spec, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center mb-6 text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500">
                  <iconify-icon icon={spec.icon} width="24" height="24"></iconify-icon>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{spec.label}</span>
                <span className="text-neutral-900 font-medium tracking-tight whitespace-nowrap">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Section */}
        {product.adImages && product.adImages.length > 0 && (
          <section className="space-y-12">
            {product.adImages.map((adImg, idx) => (
              <div key={idx} className="w-full h-[60vh] max-h-[600px] overflow-hidden bg-neutral-100 group">
                <img
                  src={adImg}
                  alt="Advertisement"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            ))}
          </section>
        )}
      </div>

      <ProductEnquiryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productSlug={product.slug}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetails;
