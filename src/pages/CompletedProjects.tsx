import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectData';

const CompletedProjects: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-12">
          <Link to="/" className="group inline-flex items-center text-neutral-400 hover:text-neutral-900 transition-colors duration-300 gap-2 uppercase tracking-[0.2em] text-[10px] sm:text-xs">
            <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span> 
            Back to Home
          </Link>
        </nav>

        <header className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-normal text-neutral-900 mb-6 uppercase tracking-tight leading-[1.1] font-marcellus">
            Completed Projects
          </h1>
          <div className="w-16 h-px bg-neutral-950 mx-auto mb-8"></div>
          <p className="text-neutral-500 max-w-2xl mx-auto text-[15px] leading-relaxed font-light">
            A portfolio of architectural landmarks and residences where Colorvision Paints
            brings design to life with lasting protection and timeless elegance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group flex flex-col transition-all duration-500">
              <div className="overflow-hidden bg-neutral-50 aspect-[4/3] relative rounded-sm group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
              </div>
              <div className="pt-6 pb-2 border-b border-transparent group-hover:border-neutral-100 transition-all duration-500">
                <h3 className="text-lg font-normal text-neutral-900 uppercase tracking-tight mb-1">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 text-neutral-400">
                  <iconify-icon icon="solar:map-point-linear" width="14" height="14"></iconify-icon>
                  <span className="text-[11px] uppercase tracking-widest font-medium">{project.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedProjects;
