import EnquiryForm from '../components/EnquiryForm';

const Contact = () => {
  return (
    <div className="bg-white pt-24 pb-32">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6">
            Contact Us
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl mb-8">
            Let's start a <br />
            <span className="text-neutral-400">conversation.</span>
          </h1>
          <p className="text-xl text-neutral-600 leading-relaxed font-light">
            Have a question about our products or need expert advice for your project?
            Our team is here to help you achieve the perfect finish.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Contact Info - Now on the left or top */}
          <div className="w-full lg:w-1/3 space-y-12 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
                Our Details
              </h3>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="flex-none h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-950">
                    <iconify-icon icon="solar:phone-calling-linear" width="20"></iconify-icon>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Phone</p>
                    <a href="tel:+918655728476" className="text-lg font-medium text-neutral-900 hover:text-neutral-500 transition-colors">
                      +91 86557 28476
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-none h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-950">
                    <iconify-icon icon="solar:letter-linear" width="20"></iconify-icon>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Email</p>
                    <a href="mailto:info@colorvisionpaints.com" className="text-lg font-medium text-neutral-900 hover:text-neutral-500 transition-colors">
                      info@colorvisionpaints.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-none h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-950">
                    <iconify-icon icon="solar:map-point-linear" width="20"></iconify-icon>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Address</p>
                    <p className="text-lg font-medium text-neutral-900 leading-relaxed max-w-sm">
                      OFFICE NO 3, SAWAN HERITAGE, PLOT NO .20 & 21, SECTOR 15, KALAMBOLI, NAVI MUMBAI - 410218.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'linkedin', 'whatsapp'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="h-10 w-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-500 hover:bg-neutral-950 hover:text-white transition-all duration-300"
                  >
                    <iconify-icon icon={`solar:${social === 'whatsapp' ? 'whatsapp' : social}-linear`} width="18"></iconify-icon>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - Now wider (2/3 width) and shorter */}
          <div className="w-full lg:w-2/3 bg-white rounded-[2rem] p-6 lg:p-10 shadow-2xl shadow-neutral-900/5 ring-1 ring-black/5 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <EnquiryForm source="Website Contact Us" createdFrom="Contact Us Page" />
          </div>
        </div>
      </div>

      {/* Map Placeholder or Visual Element */}
      <div className="mt-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="aspect-[21/9] w-full bg-neutral-50 rounded-[3rem] overflow-hidden  transition-all duration-1000 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5857570182434!2d73.0968395744279!3d19.037966853166946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9e7e25aaaab%3A0x7b58919183f813aa!2sColor%20Vision!5e0!3m2!1sen!2sin!4v1774527994335!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Contact;
