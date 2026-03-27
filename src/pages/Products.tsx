import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';

const Products: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-normal text-neutral-900 mb-4 uppercase tracking-widest">
            Our Collection
          </h1>
          <div className="w-24 h-px bg-neutral-300 mx-auto mb-6"></div>
          <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
            Discover our range of premium architectural coatings and finishes, 
            crafted for beauty and lasting protection.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div 
              key={product.slug}
              className="group flex flex-col bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-neutral-100"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-normal text-neutral-900 mb-3 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-neutral-500 mb-8 line-clamp-2 text-sm leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/products/${product.slug}`}
                    className="inline-block w-full py-4 text-center border border-neutral-900 text-neutral-900 uppercase tracking-widest text-sm transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
