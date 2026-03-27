import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BuildingVisualizer from '../components/BuildingVisualizer';

const productSlides = [
  {
    img: '/img/bucketbackslide/hommateback.jpg',
    bucketImg: '/img/bucket/hommate.png',
    tag: 'Interior',
    name: 'Hommate Distemper',
    desc: 'A premium interior finish with smooth application, rich pigment, and elegant low-sheen depth designed to elevate contemporary living spaces.',
    link: '/products/hommate-distemper'
  },
  {
    img: '/img/bucketbackslide/omniwallback.jpg',
    bucketImg: '/img/bucket/omniwall.png',
    tag: 'Inteior Series',
    name: 'Omniwall Emulsion',
    desc: 'Advanced exterior protection against heat, rain, and fading with a clean finish that preserves curb appeal over changing seasons.',
    link: '/products/omniwall-emulsion'
  },
  {
    img: '/img/bucketbackslide/sealcoreback.png',
    bucketImg: '/img/bucket/sealcore.png',
    tag: 'Exterior',
    name: 'Sealcore Acrylic Primer',
    desc: 'A statement-making wall finish that adds dimension, tactile richness, and a designer-grade visual identity to premium interiors and feature surfaces.',
    link: '/products/sealcore-primer'
  },
  {
    img: '/img/bucketbackslide/perimixback.png',
    bucketImg: '/img/bucket/perimix.png',
    tag: 'Exterior',
    name: 'Perimix Exterior Emulsion',
    desc: 'A statement-making wall finish that adds dimension, tactile richness, and a designer-grade visual identity to premium interiors and feature surfaces.',
    link: '/products/permix-emulsion'
  },
  {
    img: '/img/bucketbackslide/maxoraback.jpg',
    bucketImg: '/img/bucket/maxora.png',
    tag: 'Exterior',
    name: 'Maxora Exterior Emulsion',
    desc: 'A statement-making wall finish that adds dimension, tactile richness, and a designer-grade visual identity to premium interiors and feature surfaces.',
    link: '/products/maxora-emulsion'
  },
  {
    img: '/img/bucketbackslide/ulteraback.png',
    bucketImg: '/img/bucket/ultera.png',
    tag: 'Exterior',
    name: 'Ultera Exterior Emulsion',
    desc: 'A statement-making wall finish that adds dimension, tactile richness, and a designer-grade visual identity to premium interiors and feature surfaces.',
    link: '/products/ultera-emulsion'
  },

];

const heroSlidesData = [
  {
    id: 1,
    img: '/img/hero-advertise/hero1.jpg',
    panelColor: 'bg-slate-900',
    tag: 'Premium Interior',
    title: 'Experience Our \nInterior Wall Finish on your Home walls.',
    subtitle: 'Experience Our Interior Wall Finish on your Home walls.',
    cta1: 'Explore Products',
    cta1Link: '/products',
    cta2: 'Get Dealer',
    cta2Link: '#locator'
  },
  {
    id: 2,
    img: '/img/hero-advertise/hero2.jpg',
    panelColor: 'bg-neutral-800',
    tag: 'Designer Grade',
    title: 'Texture That\nSpeaks Style',
    subtitle: 'Elevate your interiors to art. Premium finishes engineered for a flawless, designer-grade look.',
    cta1: 'View Gallery',
    cta1Link: '/projects',
    cta2: 'Contact Us',
    cta2Link: '/contactus'
  },
  {
    id: 3,
    img: '/img/hero-advertise/hero3.jpg',
    panelColor: 'bg-zinc-900',
    tag: 'All Weather',
    title: 'Engineered for\nPerformance',
    subtitle: 'Advanced weather protection meets stunning aesthetics. Built to outlast the harshest seasons.',
    cta1: 'Our Technology',
    cta1Link: '#why-choose-us',
    cta2: 'Find a Store',
    cta2Link: '#locator'
  }
];

const Home = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [productIndex, setProductIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlidesData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLocked) return;
    const timer = setInterval(() => {
      setProductIndex((prev) => (prev + 1) % productSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isLocked]);

  const handleProductSelect = (index: number) => {
    if (productIndex === index) {
      setIsLocked(!isLocked); // Toggle lock if same item clicked
    } else {
      setProductIndex(index);
      setIsLocked(true); // Lock if new item clicked
    }
  };

  return (
    <div className="overflow-hidden">
      {/* NORMAL YET UNIQUE HERO SECTION */}
      <section id="hero" className="relative w-full h-[85dvh] lg:h-[95dvh] lg:min-h-[700px] overflow-hidden bg-white">

        {/* Full Slider Track */}
        <div
          className="relative h-full w-full flex transition-transform duration-[1200ms]"
          style={{
            width: `${heroSlidesData.length * 100}%`,
            transform: `translateX(-${heroIndex * (100 / heroSlidesData.length)}%)`,
            transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)'
          }}
        >
          {heroSlidesData.map((slide, idx) => (
            <div key={slide.id} className="relative h-full w-full flex-shrink-0 overflow-hidden" style={{ width: `${100 / heroSlidesData.length}%` }}>

              {/* Background Image - Clean without any black gradients */}
              <img
                src={slide.img}
                alt={slide.title.replace('\n', ' ')}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[12000ms] ease-out ${heroIndex === idx ? 'scale-105' : 'scale-100'}`}
              />

              {/* Static Content */}
              <div className="absolute inset-0 flex items-center justify-center mx-auto max-w-[90rem] px-6 sm:px-12 lg:px-24">
                <div className="w-full max-w-4xl flex flex-col items-center text-center z-20">
                  <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-white/90 mb-4 transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                    {slide.tag}
                  </p>
                  <h2 className={`text-4xl sm:text-5xl lg:text-[5.5rem] leading-[1.1] text-white mb-6 whitespace-pre-line drop-shadow-lg transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                    {slide.title}
                  </h2>
                  <p className={`text-sm sm:text-base lg:text-xl font-light leading-relaxed text-white max-w-2xl drop-shadow transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                    {slide.subtitle}
                  </p>

                  <div className={`mt-8 flex flex-row justify-center gap-6 lg:gap-10 w-full transition-opacity duration-1000 ${heroIndex === idx ? 'opacity-100' : 'opacity-0'}`}>
                    <a href={slide.cta1Link} className="inline-block pb-1 border-b border-white text-base font-normal tracking-wide text-white hover:opacity-75 transition-opacity">
                      {slide.cta1}
                    </a>
                    <a href={slide.cta2Link} className="inline-block pb-1 border-b border-white text-base font-normal tracking-wide text-white hover:opacity-75 transition-opacity">
                      {slide.cta2}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Minimalist Navigation Arrows */}
        <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 z-30 flex items-center gap-3">
          <button
            onClick={() => setHeroIndex(prev => (prev === 0 ? heroSlidesData.length - 1 : prev - 1))}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/20 p-3 lg:p-4 text-white backdrop-blur-md transition-all hover:bg-white/40 hover:scale-110 shadow-lg"
          >
            <iconify-icon icon="solar:arrow-left-linear" width="20" height="20"></iconify-icon>
          </button>
          <button
            onClick={() => setHeroIndex(prev => (prev + 1) % heroSlidesData.length)}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/20 p-3 lg:p-4 text-white backdrop-blur-md transition-all hover:bg-white/40 hover:scale-110 shadow-lg"
          >
            <iconify-icon icon="solar:arrow-right-linear" width="20" height="20"></iconify-icon>
          </button>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-8 lg:bottom-16 lg:left-12 z-30 flex items-center gap-3">
          {heroSlidesData.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className="group flex h-1 w-12 items-center"
            >
              <div className={`h-full w-full rounded-full transition-all duration-500 ${heroIndex === i ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/40 group-hover:bg-white/60'}`}></div>
            </button>
          ))}
        </div>

      </section>

      {/* MINIMAL GET IN TOUCH SECTION */}
      <section id="get-in-touch" className="bg-neutral-100 py-10 lg:py-16 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Intro - Now stays on left but takes less space or could be moved to top */}
            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 mb-4 drop-shadow-sm" style={{ fontFamily: "'Marcellus', serif" }}>
                Get In Touch.
              </h2>
              <p className="text-sm lg:text-base text-neutral-600 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                Connect with Colorvision Paints. Whether you're interested in our premium finishes, exploring dealership opportunities, or need technical guidance.
              </p>
            </div>

            {/* CTA instead of Form */}
            <div className="w-full lg:w-2/3 bg-white rounded-[1.5rem] p-10 lg:p-16 shadow-xl shadow-neutral-900/5 ring-1 ring-black/5 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-950 mb-6">
                <iconify-icon icon="solar:letter-unread-linear" width="32"></iconify-icon>
              </div>
              <h3 className="text-2xl font-normal text-neutral-900 mb-4" style={{ fontFamily: "'Marcellus', serif" }}>
                Ready to transform your project?
              </h3>
              <p className="text-neutral-600 mb-10 max-w-md mx-auto">
                Share your requirements with us through our official enquiry form and our experts will get back to you with a tailored solution.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-10 py-4 font-bold text-white transition-all hover:bg-neutral-800 active:scale-95 text-xs uppercase tracking-[0.2em]"
              >
                Go to Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* FULL-WIDTH IMMERSIVE PRODUCT SLIDER */}
      <section id="products" className="relative w-full overflow-hidden bg-white">
        {/* Navigation Overlays */}
        <div className="absolute left-4 lg:left-8 top-1/2 z-30 -translate-y-1/2">
          <button
            onClick={() => { setProductIndex(prev => prev === 0 ? productSlides.length - 1 : prev - 1); setIsLocked(true); }}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 lg:p-4 text-white backdrop-blur-lg shadow-lg hover:bg-white/20 transition-all h-10 w-10 lg:h-14 lg:w-14"
          >
            <iconify-icon icon="solar:alt-arrow-left-linear" width="24" height="24" style={{ strokeWidth: 1.5 }}></iconify-icon>
          </button>
        </div>
        <div className="absolute right-4 lg:right-8 top-1/2 z-30 -translate-y-1/2">
          <button
            onClick={() => { setProductIndex(prev => (prev + 1) % productSlides.length); setIsLocked(true); }}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 lg:p-4 text-white backdrop-blur-lg shadow-lg hover:bg-white/20 transition-all h-10 w-10 lg:h-14 lg:w-14"
          >
            <iconify-icon icon="solar:alt-arrow-right-linear" width="24" height="24" style={{ strokeWidth: 1.5 }}></iconify-icon>
          </button>
        </div>

        <div className="product-slider-wrapper flex h-[85dvh] lg:h-[700px] w-full" style={{ width: `${productSlides.length * 100}%`, transform: `translateX(-${productIndex * (100 / productSlides.length)}%)`, transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)' }}>
          {productSlides.map((slide, idx) => (
            <div key={idx} className="product-slide relative h-full w-full">
              <img src={slide.img} alt={slide.name} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 lg:hidden z-10 pointer-events-none"></div>

              <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between mx-auto max-w-[90rem] px-6 sm:px-12 lg:px-24 pt-16 lg:pt-0">

                {/* Mobile Floating Bucket Image */}
                <div className="flex lg:hidden relative h-[40%] sm:h-[45%] w-full items-center justify-center z-20 mb-8 mt-12">
                  <img src={slide.bucketImg} alt="Product Bucket Mobile" className="product-bucket h-full w-auto object-contain drop-shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)]" />
                </div>

                <div className="w-full max-w-xl text-white z-20 drop-shadow-2xl text-center lg:text-left mt-auto pb-24 lg:pb-0 lg:mt-0">
                  <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-2 lg:mb-4 drop-shadow-md">{slide.tag}</p>
                  <h3 className="mb-4 lg:mb-6 text-4xl tracking-tight sm:text-5xl lg:text-7xl drop-shadow-xl leading-tight">{slide.name}</h3>
                  <p className="mb-6 lg:mb-8 text-sm lg:text-lg font-medium leading-relaxed text-white drop-shadow-lg opacity-90 px-4 lg:px-0">{slide.desc}</p>
                  <Link to={slide.link} className="inline-block pb-1 border-b border-white text-base font-normal tracking-wide text-white hover:opacity-75 transition-opacity">
                    View Details
                  </Link>
                </div>

                {/* Desktop Floating Bucket Image */}
                <div className="hidden lg:flex relative h-full w-1/2 items-center justify-end z-20">
                  <img src={slide.bucketImg} alt="Product Bucket" className="product-bucket h-4/5 w-auto object-contain absolute right-10 drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT SELECTION BAR */}
      <section className="bg-white py-12 border-t border-neutral-100">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
            {productSlides.map((product, idx) => (
              <button
                key={idx}
                onClick={() => handleProductSelect(idx)}
                className={`relative group w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-3 rounded-2xl border-2 transition-all duration-500 overflow-visible ${productIndex === idx ? 'border-neutral-900 bg-neutral-50 shadow-xl' : 'border-neutral-100 hover:border-neutral-300'}`}
              >
                <img
                  src={product.bucketImg}
                  alt={product.name}
                  className={`max-h-full w-auto object-contain transition-all duration-500 ${productIndex === idx ? '-translate-y-8 scale-150 rotate-3 z-30 drop-shadow-2xl' : 'scale-100'}`}
                />

                {/* Indicator for Lock State */}
                {productIndex === idx && isLocked && (
                  <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[10px] text-white ring-4 ring-white shadow-lg animate-in zoom-in duration-300">
                    <iconify-icon icon="solar:lock-bold" width="12" height="12"></iconify-icon>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3D BUILDING VISUALISER */}
      <section className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-400">3D Architecture Visualizer</p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Experience our finishes in a three-dimensional world.
            </h2>
            <p className="mt-8 text-lg text-neutral-600 font-medium">
              Interact with our high-detail 3D building model to see how different textures and finishes transform modern architecture in real-time.
            </p>
          </div>

          <BuildingVisualizer />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">Why Choose Colorvision</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">Performance-led paints built for every kind of project.</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="group flex flex-col items-start rounded-[2rem] bg-neutral-50 p-8 sm:p-10 border border-neutral-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 inline-flex rounded-full bg-white p-4 text-neutral-900 shadow-sm ring-1 ring-neutral-100 transition-transform duration-500 group-hover:scale-110">
                <iconify-icon icon="solar:shield-check-linear" width="28" height="28"></iconify-icon>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">Strong Durability</h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-500 font-light">Built to last with dependable adhesion and consistent finish retention.</p>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col items-start rounded-[2rem] bg-neutral-50 p-8 sm:p-10 border border-neutral-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 inline-flex rounded-full bg-white p-4 text-neutral-900 shadow-sm ring-1 ring-neutral-100 transition-transform duration-500 group-hover:scale-110">
                <iconify-icon icon="solar:cloud-sun-2-linear" width="28" height="28"></iconify-icon>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">Weather Resistance</h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-500 font-light">Engineered to withstand sun, moisture, and changing outdoor conditions.</p>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col items-start rounded-[2rem] bg-neutral-50 p-8 sm:p-10 border border-neutral-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 inline-flex rounded-full bg-white p-4 text-neutral-900 shadow-sm ring-1 ring-neutral-100 transition-transform duration-500 group-hover:scale-110">
                <iconify-icon icon="solar:bag-smile-linear" width="28" height="28"></iconify-icon>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">Contractor Friendly</h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-500 font-light">Easy application, reliable coverage, and practical performance on site.</p>
            </div>

            {/* Card 4 */}
            <div className="group flex flex-col items-start rounded-[2rem] bg-neutral-50 p-8 sm:p-10 border border-neutral-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:-translate-y-2">
              <div className="mb-6 inline-flex rounded-full bg-white p-4 text-neutral-900 shadow-sm ring-1 ring-neutral-100 transition-transform duration-500 group-hover:scale-110">
                <iconify-icon icon="solar:delivery-linear" width="28" height="28"></iconify-icon>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">Fast Service</h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-500 font-light">Responsive support and quick supply to keep your work moving forward.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section id="projects" className="bg-neutral-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">Project Showcase</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">See how Colorvision transforms residential and commercial spaces.</h2>
            </div>
            <Link to="/projects" className="hidden sm:inline-block pb-1 border-b border-neutral-950 text-base font-normal tracking-wide text-neutral-950 hover:opacity-75 transition-opacity">
              View All Projects
            </Link>
          </div>

          <div className="grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-[2rem] sm:col-span-2 lg:row-span-2 group relative">
              <div className="absolute inset-0 bg-black/20 z-10 transition duration-500 group-hover:bg-black/0"></div>
              <img src="https://static.squareyards.com/resources/images/pune/project-image/vtp-pegasus-project-project-large-image1.jpg" alt="Project one" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-[2rem] group relative">
              <div className="absolute inset-0 bg-black/20 z-10 transition duration-500 group-hover:bg-black/0"></div>
              <img src="https://www.manufacturingtodayindia.com/cloud/2023/10/16/indian-oil-corporation.jpg" alt="Project two" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-[2rem] group relative">
              <div className="absolute inset-0 bg-black/20 z-10 transition duration-500 group-hover:bg-black/0"></div>
              <img src="https://www.uniqueinfra.in/images/completed-projects/rnt-college.jpg" alt="Project three" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-[2rem] sm:col-span-2 group relative">
              <div className="absolute inset-0 bg-black/20 z-10 transition duration-500 group-hover:bg-black/0"></div>
              <img src="https://18magnitude-punawale.com/assets/img/Elevation-18-Magnitude-Punawale.webp" alt="Project four" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* GROW BUSINESS */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?/img/city.jpg" alt="City background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/70 to-neutral-950/90 backdrop-blur-sm"></div>
        <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Business Growth</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-lg">Grow your business with Colorvision.</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl font-light">Partner with a paint brand focused on quality, consistency, and support for long-term retail and contractor success.</p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            <div className="rounded-[2.5rem] bg-white p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 inline-flex rounded-full bg-neutral-100 p-4 text-neutral-900 shadow-inner">
                <iconify-icon icon="solar:shop-linear" width="32" height="32" style={{ strokeWidth: 1.5 }}></iconify-icon>
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-neutral-950">For Dealers</h3>
              <ul className="mt-6 space-y-4 text-base font-medium text-neutral-600">
                <li className="flex items-center gap-4"><iconify-icon icon="solar:check-circle-bold-duotone" className="text-neutral-900 text-xl"></iconify-icon><span>Attractive product portfolio for local demand</span></li>
                <li className="flex items-center gap-4"><iconify-icon icon="solar:check-circle-bold-duotone" className="text-neutral-900 text-xl"></iconify-icon><span>Marketing and sales support for growth</span></li>
                <li className="flex items-center gap-4"><iconify-icon icon="solar:check-circle-bold-duotone" className="text-neutral-900 text-xl"></iconify-icon><span>Reliable supply and strong customer trust</span></li>
              </ul>
              <div className="mt-10">
                <a href="#contact" className="inline-block pb-1 border-b border-neutral-950 text-base font-normal tracking-wide text-neutral-950 hover:opacity-75 transition-opacity">
                  Apply for Dealership
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="mb-6 inline-flex rounded-full bg-neutral-100 p-4 text-neutral-900 shadow-inner">
                <iconify-icon icon="solar:users-group-rounded-linear" width="32" height="32" style={{ strokeWidth: 1.5 }}></iconify-icon>
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-neutral-950">For Contractors</h3>
              <ul className="mt-6 space-y-4 text-base font-medium text-neutral-600">
                <li className="flex items-center gap-4"><iconify-icon icon="solar:check-circle-bold-duotone" className="text-neutral-900 text-xl"></iconify-icon><span>Consistent coverage and easy application</span></li>
                <li className="flex items-center gap-4"><iconify-icon icon="solar:check-circle-bold-duotone" className="text-neutral-900 text-xl"></iconify-icon><span>Project-ready support for volume requirements</span></li>
                <li className="flex items-center gap-4"><iconify-icon icon="solar:check-circle-bold-duotone" className="text-neutral-900 text-xl"></iconify-icon><span>Competitive pricing for repeat business</span></li>
              </ul>
              <div className="mt-10">
                <a href="#contact" className="inline-block pb-1 border-b border-neutral-950 text-base font-normal tracking-wide text-neutral-950 hover:opacity-75 transition-opacity">
                  Get Pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATOR */}
      <section id="locator" className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-neutral-100 shadow-2xl shadow-neutral-900/10 ring-1 ring-black/5 transform transition hover:scale-[1.02] duration-500">
            <img src="/img/map.jpg" alt="Dealer map" className="h-[450px] w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">Store Locator</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-5xl">Find Our Dealer Nearby You</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-600 font-light">Search by your city to discover the nearest Colorvision dealer and get the right paint solution for your project faster.</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row shadow-lg shadow-neutral-100 p-2 border border-neutral-100 rounded-full max-w-xl">
              <div className="relative flex-1">
                <iconify-icon icon="solar:magnifer-linear" width="22" height="22" className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" style={{ strokeWidth: 1.5 }}></iconify-icon>
                <input type="text" placeholder="Enter city name..." className="w-full rounded-full bg-transparent py-4 pl-14 pr-4 text-base font-medium text-neutral-900 outline-none ring-0 placeholder:text-neutral-400 placeholder:font-normal" />
              </div>
              <button className="inline-block pb-1 border-b border-neutral-950 px-2 text-base font-normal tracking-wide text-neutral-950 hover:opacity-75 transition-opacity mx-4 self-center">
                Search Dealer
              </button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
