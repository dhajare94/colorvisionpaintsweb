import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src="/img/logo.png" alt="Colorvision Paints" className="h-12 w-auto object-contain brightness-0 invert opacity-90" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/70 font-light">Colorvision Paints delivers premium finishes, durable protection, and modern color solutions for homes, businesses, dealers, and contractors across the industry.</p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white tracking-wide">Navigation</h3>
            <div className="mt-6 flex flex-col gap-4 text-base text-white/70 font-medium">
              <Link to="/products" className="transition hover:text-white flex items-center gap-2 hover:translate-x-1 duration-300"><iconify-icon icon="solar:alt-arrow-right-linear"></iconify-icon> Products</Link>
              <Link to="/contact" className="transition hover:text-white flex items-center gap-2 hover:translate-x-1 duration-300"><iconify-icon icon="solar:alt-arrow-right-linear"></iconify-icon> Contact Us</Link>
              <Link to="/#locator" className="transition hover:text-white flex items-center gap-2 hover:translate-x-1 duration-300"><iconify-icon icon="solar:alt-arrow-right-linear"></iconify-icon> Store Locator</Link>
              <Link to="https://colorvisionpaintsrewards.onrender.com/CustomerDashboard/Login" className="transition hover:text-white flex items-center gap-2 hover:translate-x-1 duration-300"><iconify-icon icon="solar:alt-arrow-right-linear"></iconify-icon> Customer Login</Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold text-white tracking-wide">Connect With Us</h3>
            <div className="mt-6 flex items-center gap-4">
              <a href="#" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 transition hover:bg-white/20 hover:text-white hover:scale-110 duration-300 shadow-md">
                <iconify-icon icon="solar:phone-linear" width="22" height="22" style={{ strokeWidth: 1.5 }}></iconify-icon>
              </a>
              <a href="#" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 transition hover:bg-white/20 hover:text-white hover:scale-110 duration-300 shadow-md">
                <iconify-icon icon="solar:letter-linear" width="22" height="22" style={{ strokeWidth: 1.5 }}></iconify-icon>
              </a>
              <a href="#" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 transition hover:bg-white/20 hover:text-white hover:scale-110 duration-300 shadow-md">
                <iconify-icon icon="solar:map-point-linear" width="22" height="22" style={{ strokeWidth: 1.5 }}></iconify-icon>
              </a>
              <a href="#" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/90 transition hover:bg-white/20 hover:text-white hover:scale-110 duration-300 shadow-md">
                <iconify-icon icon="solar:chat-round-dots-linear" width="22" height="22" style={{ strokeWidth: 1.5 }}></iconify-icon>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-sm text-white/50 font-medium">
          <p>© 2026 Colorvision Paints. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
