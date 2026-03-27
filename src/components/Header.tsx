import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-neutral-100 shadow-md">


      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
            <img src="/img/logo.png" alt="Colorvision Paints" className="h-10 sm:h-12 w-auto object-contain" />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            <Link to="/products" className="group relative text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900">
              Products
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/projects" className="group relative text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900">
              Projects
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="https://colorvisionpaintsrewards.onrender.com/CustomerDashboard/Login" className="group relative text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-900">
              Customer Login
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link to="/contact" className="hidden text-xs font-bold uppercase tracking-[0.2em] text-white bg-neutral-950 px-8 py-3 rounded-full hover:bg-neutral-800 transition-all md:block shadow-lg text-center">
              Contact Us
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-full bg-neutral-100 p-3 text-neutral-950 transition-transform active:scale-90 md:hidden"
            >
              <iconify-icon icon="solar:hamburger-menu-linear" width="20" height="20"></iconify-icon>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="pb-6 md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100">
              <Link to="/products" className="rounded-xl px-5 py-4 text-xs font-bold uppercase tracking-widest text-neutral-800 transition hover:bg-neutral-50" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/projects" className="rounded-xl px-5 py-4 text-xs font-bold uppercase tracking-widest text-neutral-800 transition hover:bg-neutral-50" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
              <a href="/#locator" className="rounded-xl px-5 py-4 text-xs font-bold uppercase tracking-widest text-neutral-800 transition hover:bg-neutral-50" onClick={() => setMobileMenuOpen(false)}>Locator</a>
              <Link to="/contact" className="rounded-xl px-5 py-4 text-xs font-bold uppercase tracking-widest text-white bg-neutral-950 text-center shadow-lg" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
              <Link to="https://colorvisionpaintsrewards.onrender.com/CustomerDashboard/Login" className="rounded-xl px-5 py-4 text-xs font-bold uppercase tracking-widest text-white bg-neutral-950 text-center shadow-lg" onClick={() => setMobileMenuOpen(false)}>Customer Login</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
