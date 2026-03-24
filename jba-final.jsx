import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Shield, Star, Clock, Award, MapPin, Mail, ChevronRight, Menu, X, Check, Send, FileDown, Repeat, Shapes } from "lucide-react";

// Real JBA Project Images
const projectImages = [
  { src: "https://github.com/user-attachments/assets/1d34f5a2-1892-4ab3-a6c8-6e33e67bf9c3", label: "Gutter Installation" },
  { src: "https://github.com/user-attachments/assets/0ca67957-4f37-4f68-9eff-071597c88ee1", label: "Completed Project" },
  { src: "https://github.com/user-attachments/assets/37cca886-ea38-4a1e-ab94-bc015bcd5360", label: "Roof Inspection" },
  { src: "https://github.com/user-attachments/assets/78906128-1eba-48c3-9626-9777e4ca00a1", label: "Work in Progress" },
  { src: "https://github.com/user-attachments/assets/3bcf57db-ed81-4dfe-bbc5-a7bc78d8de73", label: "Roof Teardown" },
];

const logoUrl = "https://github.com/user-attachments/assets/130d5df4-386a-4ac5-9aaa-30339b94aaaf";

// Testimonials
const testimonials = [
  { text: "I saw JBA Construction working on a roof replacement in my neighborhood and was impressed with their work, so I hired them for my roof. They did an amazing job.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Thao Luanglath", role: "Bellevue", service: "Roof Replacement" },
  { text: "You can trust the JBA Team for their professional work. They even went the extra mile of fixing issues left by previous contractors.", image: "https://randomuser.me/api/portraits/men/32.jpg", name: "Jason H.", role: "Seattle", service: "Carpentry" },
  { text: "JBA construction did an amazing job. The communication was great and very professional people. The roof and gutters look amazing.", image: "https://randomuser.me/api/portraits/women/68.jpg", name: "Antonia Pio", role: "Kirkland", service: "Roof + Gutters" },
  { text: "It was a pleasure to work with Jhony and his crew! Everything was resolved perfectly.", image: "https://randomuser.me/api/portraits/men/75.jpg", name: "Ivan Laktyunkin", role: "Redmond", service: "Roof Repair" },
  { text: "Did a full kitchen cabinet install for us. Measured everything perfectly, all the doors line up. Worth every penny.", image: "https://randomuser.me/api/portraits/men/85.jpg", name: "Randy Roa", role: "Bothell", service: "Cabinets" },
  { text: "Best decision we made was hiring JBA for our deck. It's been two years and still looks brand new.", image: "https://randomuser.me/api/portraits/women/26.jpg", name: "Maria Santos", role: "Everett", service: "Deck" },
  { text: "The crown molding and trim work they did throughout our house is flawless.", image: "https://randomuser.me/api/portraits/men/42.jpg", name: "David Chen", role: "Sammamish", service: "Trim Work" },
  { text: "Had an emergency roof leak during a storm. JBA came out same day and had it fixed within the week.", image: "https://randomuser.me/api/portraits/women/55.jpg", name: "Jennifer Park", role: "Lynnwood", service: "Emergency" },
  { text: "Third time using JBA. Consistent quality every single time. They're my go-to.", image: "https://randomuser.me/api/portraits/men/22.jpg", name: "Michael Torres", role: "Renton", service: "Multiple" },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const processSteps = [
  { label: "Request Your Estimate", message: "Fill out the form or give us a call. We'll ask a few questions and schedule a time to come look.", icon: Send, color: "amber" },
  { label: "We Assess the Job", message: "One of our guys comes out, takes measurements, and gives you an honest assessment. No charge.", icon: Shapes, color: "blue" },
  { label: "Review Your Quote", message: "Within 48 hours you'll have a detailed written quote. No hidden fees, no surprises.", icon: Check, color: "green" },
  { label: "We Do the Work", message: "Our crew shows up on time, works clean, and keeps you updated throughout.", icon: Repeat, color: "purple" },
  { label: "Final Walkthrough", message: "We walk through everything with you. If something's not right, we fix it.", icon: FileDown, color: "emerald" },
];

const faqs = [
  { q: "How long does a roof replacement take?", a: "Most residential roofs take 1-3 days depending on size and weather." },
  { q: "Do you pull permits?", a: "Yes, for any work that requires a permit, we handle all the permitting." },
  { q: "What's your warranty?", a: "5 years on workmanship. If our work fails, we fix it at no cost." },
  { q: "Do you offer financing?", a: "Yes. 0% financing options through GreenSky for qualified buyers." },
  { q: "How much does a new roof cost?", a: "Most homes run $8,000 to $20,000. We give exact numbers after seeing the job." },
  { q: "Are you licensed?", a: "Fully licensed in WA State, bonded, and insured." },
];

// Shine Border Component
const ShineBorder = ({ children, className = "", borderRadius = 16, borderWidth = 2, duration = 10, color = ["#C8A84B", "#E5D4A1", "#C8A84B"] }) => {
  const colorString = Array.isArray(color) ? color.join(",") : color;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ borderRadius: `${borderRadius}px` }}>
      <div
        className="absolute inset-0 z-0"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          background: `linear-gradient(90deg, transparent, ${colorString}, transparent)`,
          backgroundSize: "200% 100%",
          animation: `shimmer ${duration}s linear infinite`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative z-10 h-full w-full" style={{ borderRadius: `${borderRadius - borderWidth}px` }}>
        {children}
      </div>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
};

// Timeline Component
const TimelineEvent = ({ step, isLast }) => {
  const Icon = step.icon;
  const colors = {
    amber: { border: "border-amber-500/50", text: "text-amber-500", bg: "bg-amber-500/10" },
    blue: { border: "border-blue-500/50", text: "text-blue-500", bg: "bg-blue-500/10" },
    green: { border: "border-green-500/50", text: "text-green-500", bg: "bg-green-500/10" },
    purple: { border: "border-purple-500/50", text: "text-purple-500", bg: "bg-purple-500/10" },
    emerald: { border: "border-emerald-500/50", text: "text-emerald-500", bg: "bg-emerald-500/10" },
  };
  const c = colors[step.color] || colors.amber;
  
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="relative flex flex-col items-center">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${c.border} ${c.bg} flex items-center justify-center z-10`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${c.text}`} />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-zinc-700 absolute top-10 sm:top-12" />}
      </div>
      <div className="pb-6 sm:pb-8 flex-1">
        <h4 className="text-white font-semibold text-base sm:text-lg">{step.label}</h4>
        <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{step.message}</p>
      </div>
    </div>
  );
};

// Testimonials Column
const TestimonialsColumn = ({ testimonials, duration = 15, className = "" }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      className="flex flex-col gap-4 pb-4"
    >
      {[0, 1].map((_, idx) => (
        <React.Fragment key={idx}>
          {testimonials.map((t, i) => (
            <div key={i} className="p-4 sm:p-5 bg-zinc-900 border border-zinc-800 rounded-xl w-[280px] sm:w-72 flex-shrink-0">
              <div className="text-amber-400 text-xs tracking-widest mb-2">★★★★★</div>
              <p className="text-white/80 text-sm leading-relaxed">{t.text}</p>
              <span className="mt-2 inline-block bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500 uppercase rounded">{t.service}</span>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800">
                <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-white text-sm">{t.name}</div>
                  <div className="text-zinc-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

// Service Card
const ServiceCard = ({ icon: Icon, title, description, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full border border-zinc-200">
      {image && (
        <div className="h-40 sm:h-48 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-5 sm:p-6">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-black" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{title}</h3>
        <p className="text-zinc-600 text-sm leading-relaxed mb-4">{description}</p>
        <a href="#quote" className="inline-flex items-center gap-1 text-amber-600 text-sm font-semibold hover:gap-2 transition-all">
          Get Quote <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </motion.div>
);

// Main App
export default function JBAConstruction() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', zip: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! We'll call you back within a few hours.");
    setFormData({ name: '', phone: '', service: '', zip: '' });
  };

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-zinc-900 py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2 text-white text-xs sm:text-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" /> King & Snohomish County</span>
            <span className="hidden sm:flex items-center gap-1"><Clock className="w-4 h-4 text-amber-400" /> Mon-Sat 7AM-6PM</span>
          </div>
          <a href="tel:6176516266" className="flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300"><Phone className="w-3 h-3 sm:w-4 sm:h-4" /> (617) 651-6266</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src={logoUrl} alt="JBA Construction" className="h-12 sm:h-14 w-auto" />
          </a>
          
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { label: 'Home', href: '#' },
              { label: 'About', href: '#about' },
              { label: 'Services', href: '#services' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'FAQ', href: '#faq' },
            ].map(item => (
              <a key={item.label} href={item.href} className="text-sm text-zinc-600 hover:text-amber-600 font-medium transition-colors">{item.label}</a>
            ))}
            <a href="#quote" className="bg-amber-500 text-black px-5 py-2.5 font-bold text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-md">
              Free Estimate
            </a>
          </nav>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-zinc-900" /> : <Menu className="w-6 h-6 text-zinc-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="lg:hidden bg-white border-t border-zinc-200 px-4 py-4"
          >
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#' },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'FAQ', href: '#faq' },
              ].map(item => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-zinc-700 hover:text-amber-600 py-2 font-medium">{item.label}</a>
              ))}
              <a href="#quote" onClick={() => setMobileMenuOpen(false)} className="bg-amber-500 text-black px-5 py-3 font-bold text-center rounded-lg mt-2">
                Free Estimate
              </a>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="quote" className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden bg-zinc-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={projectImages[2].src} 
            alt="JBA Construction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-6">
                <img src={logoUrl} alt="JBA" className="h-14 sm:h-16 w-auto" />
              </div>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3 sm:px-4 py-2 rounded-full mb-5">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-white/90 text-xs sm:text-sm">5,078 Google Reviews</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                Your Roof Is Our <span className="text-amber-400">Reputation</span>
              </h1>

              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-lg mb-6">
                Over 10 years serving King and Snohomish County. We show up on time, clean up after ourselves, and stand behind every job with a 5 year warranty.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                {['Free Estimates', 'Licensed & Bonded', '5 Year Warranty', 'Financing'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                    <span className="text-white text-xs sm:text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:6176516266" className="inline-flex items-center justify-center gap-2 bg-amber-500 text-black px-6 py-3.5 font-bold rounded-lg hover:bg-amber-400 transition-all text-sm sm:text-base">
                  <Phone className="w-5 h-5" /> Call (617) 651-6266
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-6 py-3.5 font-semibold rounded-lg hover:bg-white/20 transition-all text-sm sm:text-base">
                  View Our Services
                </a>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mx-auto lg:mx-0"
            >
              <ShineBorder borderRadius={20} borderWidth={2} duration={6} color={["#C8A84B", "#FFD700", "#E5D4A1"]}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-zinc-900 px-5 sm:px-6 py-4 text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-white">Get Your Free Estimate</h3>
                    <p className="text-zinc-400 text-sm">Same day response</p>
                  </div>
                  <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                    <div>
                      <label className="text-xs text-zinc-500 uppercase font-semibold">Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Smith" className="w-full mt-1 bg-zinc-100 border border-zinc-200 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none rounded-lg transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 uppercase font-semibold">Phone</label>
                      <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="(555) 123-4567" className="w-full mt-1 bg-zinc-100 border border-zinc-200 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none rounded-lg transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 uppercase font-semibold">Service Needed</label>
                      <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full mt-1 bg-zinc-100 border border-zinc-200 px-4 py-3 text-zinc-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none rounded-lg transition-all">
                        <option value="">Select a service...</option>
                        <option value="roof-repair">Roof Repair</option>
                        <option value="roof-replacement">Roof Replacement</option>
                        <option value="gutters">Gutters</option>
                        <option value="cabinets">Cabinet Installation</option>
                        <option value="carpentry">Finish Carpentry</option>
                        <option value="deck">Deck or Fence</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-500 uppercase font-semibold">City or Zip Code</label>
                      <input type="text" required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} placeholder="Seattle, 98101" className="w-full mt-1 bg-zinc-100 border border-zinc-200 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none rounded-lg transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-amber-500 text-black py-3.5 font-bold text-base sm:text-lg rounded-lg hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
                      Send My Request
                    </button>
                  </form>
                  <div className="px-5 pb-5 flex items-center justify-center gap-2 text-zinc-500 text-sm">
                    <Shield className="w-4 h-4 text-green-600" /> No spam. We call back fast.
                  </div>
                </div>
              </ShineBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-zinc-900 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: "Licensed & Insured", sub: "WA State License" },
              { icon: Star, title: "5 Star Rated", sub: "5,078 Reviews" },
              { icon: Clock, title: "10+ Years", sub: "Since 2014" },
              { icon: Award, title: "5 Year Warranty", sub: "On Workmanship" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm sm:text-base">{item.title}</div>
                  <div className="text-zinc-400 text-xs sm:text-sm">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">About JBA</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2 mb-5 leading-tight">
                We're Not the Cheapest. <span className="text-amber-600">We're the Ones You Won't Have to Call Back.</span>
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Jhony started JBA Construction in 2014 with one truck. Today we've got a full crew, but the same philosophy: do the job right the first time, clean up, and treat your home like our own.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-6">
                We're not going to lowball you and cut corners. But we're also not going to overcharge for work that doesn't need to be done. We'll tell you what's actually wrong and give you honest options.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "We Show Up On Time", desc: "No 'between 8 and 5.' We give you a time and stick to it." },
                  { title: "5 Year Warranty", desc: "If our work fails, we come back and fix it. No questions." },
                  { title: "Financing Available", desc: "0% options through GreenSky for big jobs." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-900">{item.title}</h4>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={projectImages[3].src} alt="JBA at Work" className="w-full h-64 sm:h-80 lg:h-96 object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-amber-500 rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="text-3xl sm:text-4xl font-bold text-black">10+</div>
                <div className="text-black/70 text-sm font-semibold">Years in Business</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio / Gallery */}
      <section id="portfolio" className="py-16 sm:py-20 px-4 bg-zinc-100">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Recent <span className="text-amber-600">Projects</span></h2>
            <p className="text-zinc-600 mt-3 max-w-lg mx-auto">Real work from real jobs. Every project gets the same attention to detail.</p>
          </motion.div>

          {/* Mobile: Horizontal scroll / Desktop: Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projectImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
                  <img src={img.src} alt={img.label} className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <span className="text-white font-semibold">{img.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Roofing, Carpentry & More</h2>
            <p className="text-zinc-600 mt-3 max-w-lg mx-auto">We do a few things and we do them well. Quality work, fair prices, no shortcuts.</p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <ServiceCard 
              icon={({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l7-4 7 4v14"/></svg>} 
              title="Roof Repair & Replacement" 
              description="Storm damage, missing shingles, leaks. We work with GAF, Owens Corning, and CertainTeed." 
              image={projectImages[4].src} 
            />
            <ServiceCard 
              icon={({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>} 
              title="Cabinet Installation" 
              description="Kitchen, bathroom, office. We install cabinets from any source, big box or custom." 
              image={projectImages[3].src} 
            />
            <ServiceCard 
              icon={({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>} 
              title="Finish Carpentry" 
              description="Crown molding, baseboards, door casings. The details that make a house look finished." 
              image={projectImages[2].src} 
            />
            <ServiceCard 
              icon={({ className }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/></svg>} 
              title="Gutters & More" 
              description="Installation, repair, cleaning. Also decks, fences, and general carpentry work." 
              image={projectImages[0].src} 
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 px-4 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">How It Works</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-8">From First Call to <span className="text-amber-400">Final Walkthrough</span></h2>
              
              <div>
                {processSteps.map((step, i) => (
                  <TimelineEvent key={i} step={step} isLast={i === processSteps.length - 1} />
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <ShineBorder borderRadius={20} borderWidth={2} duration={8} color={["#C8A84B", "#22c55e", "#3b82f6", "#C8A84B"]}>
                <div className="bg-zinc-800 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Why Customers Choose JBA</h3>
                  <div className="space-y-4">
                    {[
                      { title: "We Show Up On Time", desc: "No 'between 8 and 5.' We give you a time and stick to it." },
                      { title: "Transparent Pricing", desc: "Detailed written quotes. No hidden fees, no surprises." },
                      { title: "Clean Worksite", desc: "We clean up every day. Your property stays livable." },
                      { title: "5 Year Warranty", desc: "If our work fails, we fix it. No questions asked." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <p className="text-zinc-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-zinc-700">
                    <div className="flex items-center gap-4">
                      <img src={logoUrl} alt="JBA" className="h-10 sm:h-12 w-auto" />
                      <div>
                        <div className="text-amber-400 font-bold">10+ Years in Business</div>
                        <div className="text-zinc-500 text-sm">Serving Seattle since 2014</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ShineBorder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-16 sm:py-20 px-4 bg-zinc-900 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10">
            <div>
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Reviews</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">5,078 Reviews. <span className="text-amber-400">5 Stars.</span></h2>
            </div>
            <div className="flex items-center gap-4 bg-zinc-800 px-5 py-4 rounded-xl border border-zinc-700">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-amber-400">5.0</div>
                <div className="text-amber-400 text-sm">★★★★★</div>
              </div>
              <div className="text-zinc-400 text-sm">
                <div>Google Reviews</div>
                <div className="text-white font-semibold">5,078 verified</div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4" style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)", maxHeight: "500px", overflow: "hidden" }}>
            <TestimonialsColumn testimonials={firstColumn} duration={24} />
            <TestimonialsColumn testimonials={secondColumn} duration={30} className="hidden md:block" />
            <TestimonialsColumn testimonials={thirdColumn} duration={27} className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest">Questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Stuff People <span className="text-amber-600">Ask Us</span></h2>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }}
                className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 sm:p-6 hover:border-amber-300 transition-colors"
              >
                <h4 className="font-semibold text-zinc-900 flex items-start gap-3">
                  <span className="w-6 h-6 bg-amber-500 text-black flex items-center justify-center text-xs font-bold flex-shrink-0 rounded">Q</span>
                  {faq.q}
                </h4>
                <p className="text-zinc-600 text-sm mt-3 ml-9 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <ShineBorder borderRadius={24} borderWidth={3} duration={5} color={["#C8A84B", "#FFD700", "#E5D4A1"]}>
            <div className="bg-amber-500 rounded-3xl p-8 sm:p-12 text-center">
              <img src={logoUrl} alt="JBA" className="h-14 sm:h-16 w-auto mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">Ready to Get Started?</h2>
              <p className="text-black/70 text-base sm:text-lg mt-3">Free estimates, same day response. Give us a call.</p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:6176516266" className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 font-bold rounded-lg hover:bg-zinc-800 transition-colors">
                  <Phone className="w-5 h-5" /> Call (617) 651-6266
                </a>
                <a href="#quote" className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 font-bold rounded-lg hover:bg-zinc-100 transition-colors">
                  Get Free Estimate
                </a>
              </div>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <img src={logoUrl} alt="JBA Construction" className="h-12 sm:h-14 w-auto mb-4" />
              <p className="text-zinc-400 text-sm">Premium roofing & carpentry in Seattle since 2014. Licensed, bonded, insured.</p>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold text-sm mb-4">Services</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>Roof Repair</li>
                <li>Roof Replacement</li>
                <li>Cabinet Installation</li>
                <li>Finish Carpentry</li>
                <li>Decks & Fences</li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><a href="#about" className="hover:text-amber-400 transition-colors">About</a></li>
                <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfolio</a></li>
                <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold text-sm mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <a href="tel:6176516266" className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"><Phone className="w-4 h-4 text-amber-400" /> (617) 651-6266</a>
                <a href="tel:6179389090" className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"><Phone className="w-4 h-4 text-amber-400" /> (617) 938-9090</a>
                <a href="mailto:Jba2contact@gmail.com" className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"><Mail className="w-4 h-4 text-amber-400" /> Jba2contact@gmail.com</a>
                <div className="flex items-center gap-2 text-zinc-400"><MapPin className="w-4 h-4 text-amber-400" /> King & Snohomish County</div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-zinc-800 text-zinc-500 text-xs sm:text-sm text-center">
            © 2024 JBA Construction LLC. All rights reserved. WA License #JBACO*123
          </div>
        </div>
      </footer>
    </div>
  );
}
