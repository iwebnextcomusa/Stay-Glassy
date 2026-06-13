import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShoppingCart, 
  Download, 
  BookOpen, 
  GraduationCap, 
  ChevronRight, 
  ArrowUp, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Heart, 
  HelpCircle,
  Menu,
  X,
  Layers,
  Percent,
  Check,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThreeDSection from "./components/ThreeDSection";
import ChatbotWidget from "./components/ChatbotWidget";
import CreatorCompanion from "./components/CreatorCompanion";
import { PRODUCTS, CARD_MOCKUPS, REVIEWS, FAQS } from "./data";
import { Product } from "./types";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [showBlueprintSuite, setShowBlueprintSuite] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Checkout & Cart State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // PDF Rules Modal
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  // Form Submissions
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [institutionRole, setInstitutionRole] = useState("parent");

  // Scroll to track
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 400);

      // Simple active link highlight tracking
      const sections = ["home", "about", "gameplay", "educators", "shop", "faq", "contact"];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll back to top smoothly
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart operations
  const addToCart = (product: Product, qty: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += qty;
        return next;
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((item) => item.product.id !== productId);
      return prev.map((item) => 
        item.product.id === productId ? { ...item, quantity: qty } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Quantity Tier discount calculator
  const calculateCartTotals = () => {
    let subtotal = 0;
    let itemsCount = 0;

    cart.forEach((item) => {
      subtotal += item.product.price * item.quantity;
      itemsCount += item.quantity;
    });

    // Educator volume pricing discount: 15% off if buying over 3 decks; 25% off if buying over 5 decks (Classroom packs)
    let discountPercent = 0;
    if (itemsCount >= 5) {
      discountPercent = 25;
    } else if (itemsCount >= 3) {
      discountPercent = 15;
    }

    const discountAmount = subtotal * (discountPercent / 100);
    const finalTotal = subtotal - discountAmount;

    return {
      subtotal,
      discountPercent,
      discountAmount,
      finalTotal,
      itemsCount
    };
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setCart([]);
    }, 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  const { subtotal, discountPercent, discountAmount, finalTotal, itemsCount } = calculateCartTotals();

  return (
    <div className="min-h-screen bg-[#fafbfc] text-gray-950 selection:bg-orange-500 selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Background Pastel Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-5 w-[500px] h-[500px] bg-indigo-300/5 rounded-full blur-[120px] pointer-events-none"></div>
 
      {/* HEADER NAVBAR */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-indigo-100/80" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo element matches brand guidelines */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-200 group-hover:border-orange-500/80 transition-colors">
              <span className="font-extrabold text-orange-600 text-lg font-mono">G</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-indigo-950 font-sans leading-none">
                StayGlassy<span className="text-orange-500">.ca</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#6c7894] uppercase leading-normal font-bold">
                Sacramento Logic
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "gameplay", label: "Overview" },
              { id: "educators", label: "Educators" },
              { id: "shop", label: "Shop" },
              { id: "faq", label: "FAQs" },
              { id: "contact", label: "Contact" }
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-tight transition-all cursor-pointer ${
                  currentSection === tab.id
                    ? "text-orange-600 bg-orange-50 font-bold"
                    : "text-[#515c76] hover:text-indigo-950 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Strategy / Blueprint Suite Tab Toggle */}
            <button
              id="btn-blueprint-suite"
              onClick={() => setShowBlueprintSuite(!showBlueprintSuite)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold font-sans border transition-all cursor-pointer flex items-center gap-1.5 ${
                showBlueprintSuite
                  ? "bg-orange-500 text-white border-orange-400 font-extrabold shadow-sm"
                  : "bg-[#f4f6fa] text-indigo-950 border-indigo-100 hover:border-orange-400 hover:bg-orange-50/50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Blueprint Suite
            </button>

            {/* Simulated Shopping Cart trigger button */}
            <button
              id="btn-cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#f4f6fa] border border-indigo-100 text-[#4c556b] hover:text-[#fb6b1d] transition-all cursor-pointer hover:border-[#fb6b1d] shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#fb6b1d] text-white font-mono text-[10px] font-extrabold flex items-center justify-center animate-bounce">
                  {itemsCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-2">
            {/* Simulated Shopping Cart trigger button */}
            <button
              id="btn-cart-trigger-mob"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-[#f4f6fa] border border-indigo-10 border-indigo-100 text-[#4c556b] hover:text-[#fb6b1d] transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-[#fb6b1d] text-white font-mono text-[9px] font-bold flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </button>

            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#f4f6fa] border border-indigo-100 text-[#4c556b]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg border-t border-indigo-50 p-4 mt-2 space-y-2">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About Us" },
              { id: "gameplay", label: "Game Overview" },
              { id: "educators", label: "Educators" },
              { id: "shop", label: "Shop Products" },
              { id: "faq", label: "FAQs Hub" },
              { id: "contact", label: "Get in Touch" }
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentSection === tab.id
                    ? "text-orange-600 bg-orange-50 font-bold"
                    : "text-[#4c556b] hover:text-[#fb6b1d] hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </a>
            ))}
            
            <div className="pt-2 border-t border-indigo-50 flex items-center gap-2">
              <button
                id="btn-blueprint-suite-mob"
                onClick={() => {
                  setShowBlueprintSuite(!showBlueprintSuite);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full py-2.5 rounded-xl text-xs font-bold border text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  showBlueprintSuite
                    ? "bg-orange-500 text-white border-orange-400 font-extrabold"
                    : "bg-[#f4f6fa] border-indigo-100 text-[#4c556b]"
                }`}
              >
                <Layers className="w-4 h-4" />
                Blueprint Strategy Suite
              </button>
            </div>
          </div>
        )}
      </header>

      {/* STRATEGY PORTAL PANEL */}
      <AnimatePresence>
        {showBlueprintSuite && (
          <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4.5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CreatorCompanion />
              <div className="flex justify-center mt-4">
                <button
                  id="btn-hide-blueprint"
                  onClick={() => setShowBlueprintSuite(false)}
                  className="px-4 py-2 rounded-lg bg-[#f4f6fa] hover:bg-orange-50 text-indigo-950 hover:text-orange-600 text-xs font-mono border border-indigo-150 transition-colors cursor-pointer font-bold shadow-xs animate-pulse"
                >
                  ▲ Collapse Blueprint Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-24">
        
        {/* HERO SECTION */}
        <section id="home" className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy column */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-2xl w-fit shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-orange-700 font-bold">
                    Proudly Created in Sacramento, California
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[#3E2723] font-black font-sans tracking-tight leading-[110%] text-indigo-950">
                  Think Critically.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-indigo-600">
                    Play Logically.
                  </span>
                </h1>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl font-sans font-medium">
                  Meet the revolutionary educational card game crafted for families, study clusters, and middle-to-high school science labs to decode cognitive biases, master deductive rules, and build immaculate arguments.
                </p>

                {/* Benefits mini track */}
                <div className="grid grid-cols-2 gap-4 my-2.5">
                  <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl border border-indigo-50/50">
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 text-xs font-extrabold border border-orange-100">✓</div>
                    <span className="text-xs text-indigo-950 font-sans font-bold">CCSS & NGSS Aligned</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl border border-indigo-50/50">
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 text-xs font-extrabold border border-orange-100">✓</div>
                    <span className="text-xs text-indigo-950 font-sans font-bold">Ages 8 and up</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl border border-indigo-50/50">
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 text-xs font-extrabold border border-orange-100">✓</div>
                    <span className="text-xs text-indigo-950 font-sans font-bold">Procurement PO Ready</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 p-2 rounded-xl border border-indigo-50/50">
                    <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 text-xs font-extrabold border border-orange-100">✓</div>
                    <span className="text-xs text-indigo-950 font-sans font-bold">Made in California</span>
                  </div>
                </div>

                {/* Primary/Secondary Buttons */}
                <div className="flex flex-wrap gap-3.5 mt-2">
                  <a
                    href="#shop"
                    className="px-6 py-3.5 rounded-xl bg-orange-600 text-white font-extrabold hover:bg-orange-500 text-xs sm:text-sm tracking-wide transition-all shadow-md hover:scale-[1.02] border border-orange-400"
                  >
                    Buy Starter Deck
                  </a>
                  <button
                    id="btn-rules-preview-trigger"
                    onClick={() => setIsRulesModalOpen(true)}
                    className="px-6 py-3.5 rounded-xl bg-[#f4f6fa] border border-indigo-10 border-indigo-150 text-[#30384a] hover:text-indigo-950 text-xs sm:text-sm font-bold hover:border-orange-300 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <BookOpen className="w-4 h-4 text-orange-600" />
                    How to Play - Rules PDF
                  </button>
                </div>
              </div>

              {/* Graphical card visual column */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="absolute w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                
                {/* Custom White Layer Showcase Card with real-time perspective styles */}
                <div className="relative w-[280px] sm:w-[320px] h-[440px] rounded-2xl bg-white p-5 flex flex-col justify-between border border-indigo-100 shadow-xl transform hover:-rotate-2 hover:scale-[1.03] transition-all duration-500 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-orange-600 font-extrabold">Logic Core Card</span>
                    <span className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 font-mono text-xs flex items-center justify-center font-bold">
                      +3
                    </span>
                  </div>

                  <div className="my-5 flex flex-col">
                    <h3 className="text-2xl font-black font-sans text-indigo-950 flex items-center gap-2">
                      Post Hoc Fallacy
                    </h3>
                    <div className="w-12 h-1.5 bg-gradient-to-r from-orange-500 to-indigo-500 my-2 rounded"></div>
                    <p className="text-gray-700 text-xs leading-relaxed font-sans font-medium">
                      Deduct points from an opponent who claimed a temporal correlation implied definite causation.
                    </p>
                  </div>

                  <div className="bg-orange-50/60 p-4.5 rounded-xl border border-orange-100/50">
                    <span className="text-[9px] font-mono uppercase text-orange-700 font-bold block mb-1">Empirical Check:</span>
                    <p className="text-[10.5px] text-gray-700 italic leading-normal">
                      "Just because the rooster crows before dawn, does not mean the rooster commanded the sun."
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-2 border-t border-indigo-50">
                    <span className="font-bold">STAYGLASSY.CA</span>
                    <span>DECK 01 // CARD 14</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT PAGE */}
        <section id="about" className="py-16 md:py-24 border-t border-indigo-100 bg-[#f4f6fa]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Graphic/Map column */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm space-y-4 text-left">
                  <span className="text-[10px] font-mono uppercase text-orange-600 block tracking-widest font-extrabold">Our DNA Blueprint</span>
                  <blockquote className="text-gray-750 text-sm font-sans italic leading-relaxed text-indigo-950 font-medium">
                    "We realized standard schooling had hundreds of resources for memorization, but almost nothing designed as a fun game for critical thinking."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center font-black text-xs text-orange-600">D</div>
                    <div>
                      <p className="text-xs font-bold text-indigo-950">Dakota</p>
                      <p className="text-[9px] font-mono text-gray-400 font-bold">Founder, StayGlassy.ca</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-indigo-100 flex justify-between items-center shadow-xs">
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-indigo-950">Sacramento Origin</h4>
                    <p className="text-xs text-gray-500">California educational gaming hub.</p>
                  </div>
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
              </div>

              {/* Text content column */}
              <div className="lg:col-span-7 flex flex-col gap-5 text-left">
                <div>
                  <span className="text-orange-600 text-xs font-mono tracking-widest uppercase mb-1 block font-extrabold">
                    Our Story, Mission & Vision
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-sans text-indigo-950 tracking-tight">
                    Making Thought Transparent
                  </h2>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed font-sans font-medium">
                  Founded in Sacramento, California, <strong className="text-indigo-950">StayGlassy.ca</strong> began with a simple observation: children, teenagers, and even adults are bombarded by digital misdirections and cognitive traps daily. Our founder, Dakota, designed a system that teaches people to spot structural errors in debates through active, cooperative table-top gameplay.
                </p>

                <p className="text-gray-700 text-sm leading-relaxed font-sans font-medium">
                  Our mission is to arm families and educators with tactical, modular games that challenge players to question confirmation biases, identify fallacies, and engage in open Socratic debates without losing the fun.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5 pt-4 border-t border-indigo-100">
                  <div className="space-y-1.5">
                    <h4 className="text-xs uppercase font-mono text-orange-600 font-bold">The Dream</h4>
                    <p className="text-xs text-gray-500">Cultivate a global circle of students who examine arguments objectively.</p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xs uppercase font-mono text-[#5c36cc] font-bold">The Method</h4>
                    <p className="text-xs text-gray-500">Replace boring texts with high-friction educational puzzle decks.</p>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xs uppercase font-mono text-orange-600 font-bold">The Standard</h4>
                    <p className="text-xs text-gray-500">Stay strictly aligned with CA Next Generation Science Argumentation.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* GAMEPLAY OVERVIEW SECTION */}
        <section id="gameplay" className="py-16 md:py-24 border-t border-indigo-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header copy */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-orange-600 text-xs font-mono tracking-widest uppercase font-bold">
                The Anatomy of Play
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-sans text-indigo-950 tracking-tight">
                How StayGlassy Works
              </h2>
              <p className="text-[#48536b] text-xs sm:text-sm leading-normal font-sans font-medium">
                No complex rules, no manual memorization. Draw fallacy cards, challenge claims with logical counterpoints, and build cognitive immunities while competing for logic marks.
              </p>
            </div>

            {/* Steps & Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  step: "01",
                  title: "Set the Base",
                  desc: "Each team starts with 5 'Argument Foundations' containing scientific assertions."
                },
                {
                  step: "02",
                  title: "Draw Fallacies",
                  desc: "Draw active cards like 'Post Hoc' or 'Slippery Slope' to disrupt circular argument builds."
                },
                {
                  step: "03",
                  title: "Engage Socratic Shields",
                  desc: "Defend your points with 'Double-Blind' protocols and rigorous evidentiary blocks."
                },
                {
                  step: "04",
                  title: "Secure the Win",
                  desc: "Be the first team to establish three pristine, error-free arguments to conquer the session."
                }
              ].map((stepObj, idx) => (
                <div key={idx} className="bg-slate-50/50 p-5 rounded-2xl border border-indigo-50/70 space-y-4 text-left shadow-xs">
                  <span className="text-3xl font-black font-mono text-orange-600/10 block">{stepObj.step}</span>
                  <h3 className="text-base font-extrabold font-sans text-indigo-950">{stepObj.title}</h3>
                  <p className="text-xs text-[#525d76] leading-relaxed font-sans">{stepObj.desc}</p>
                </div>
              ))}
            </div>

            {/* Static Grid showing four core card types */}
            <div className="my-12">
              <h3 className="text-lg font-bold font-sans text-indigo-950 text-center mb-6">
                Explore Core Card Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                {CARD_MOCKUPS.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white p-5 rounded-2xl border border-indigo-100 flex flex-col justify-between h-[280px] hover:border-orange-500/50 hover:shadow-md transition-all duration-300 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold uppercase text-gray-400">{card.type} Deck</span>
                      <span className="text-[10px] bg-orange-50 border border-orange-100 text-orange-600 font-mono px-1.5 py-0.5 rounded font-extrabold">
                        +{card.points}pts
                      </span>
                    </div>

                    <div className="my-4">
                      <h4 className="text-sm font-black text-indigo-955 text-indigo-950">{card.title}</h4>
                      <p className="text-xs text-gray-650 text-gray-600 mt-1.5 leading-relaxed font-sans">{card.description}</p>
                    </div>

                    {card.flavorText && (
                      <p className="text-[9px] text-[#717e9b] italic border-t border-indigo-50 pt-2 font-serif font-medium">
                        "{card.flavorText}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Download section prompt */}
            <div className="bg-slate-50/60 p-6 md:p-8 rounded-2xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-200 shadow-xs">
                  <Download className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-indigo-950 font-sans">Download Rule Summary Sheet (PDF)</h4>
                  <p className="text-xs text-[#525d76] font-sans">Printer-friendly setup worksheets for classrooms & study segments.</p>
                </div>
              </div>
              <button
                id="btn-rules-preview-trigger-ct"
                onClick={() => setIsRulesModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-orange-600 text-white font-extrabold hover:bg-orange-500 text-xs sm:text-sm tracking-wide transition-all shadow-md cursor-pointer text-center whitespace-nowrap border border-orange-400"
              >
                Get Printable Rules
              </button>
            </div>

          </div>
        </section>

        {/* 3D INTERACTIVE SHOWCASE */}
        <section className="py-16 md:py-24 border-t border-indigo-100 bg-[#fafbfc]/35">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-orange-600 text-xs font-mono uppercase tracking-widest font-bold">
                iWebNext 3D Space
              </span>
              <h2 className="text-3xl font-black font-sans text-indigo-950 tracking-tight">
                Synthesize Logical Geometry
              </h2>
              <p className="text-gray-600 text-xs font-medium font-sans">
                Interact with our custom real-time WebGL mesh models. Test materials, watch orbital behaviors, and rotate card layers smoothly.
              </p>
            </div>
            
            <ThreeDSection />
          </div>
        </section>

        {/* EDUCATORS WORKSPACE SECTION */}
        <section id="educators" className="py-16 md:py-24 border-t border-indigo-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy column */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                <div>
                  <span className="text-orange-600 text-xs font-mono tracking-widest uppercase mb-1 block font-bold">
                    Curriculum Standards Mapping
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black font-sans text-indigo-950 tracking-tight">
                    Optimized for CCSS & NGSS Classroom Work
                  </h2>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed font-sans font-medium">
                  StayGlassy isn’t just a game—it’s a rigorous instructional strategy. We supply educators with complete, ready-to-deploy lesson modules mapping directly to California Common Core (Literacy in Science and Argumentation writing) and NGSS Scientific Practices (engaging in argumentation from evidence).
                </p>

                {/* Progress Indicators of Curriculum Matching */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-indigo-950 font-bold">NGSS Scientific Argumentation Practice (MS-ETS-1)</span>
                      <span className="text-orange-600 font-extrabold">100% Core Map</span>
                    </div>
                    <div className="w-full bg-slate-105 bg-slate-100 h-2 rounded overflow-hidden border border-indigo-50">
                      <div className="w-full h-full bg-orange-500 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1">
                      <span className="text-indigo-950 font-bold">CCSS ELA Grade 8-12 Debating/Writing Argument Models</span>
                      <span className="text-[#5c36cc] font-extrabold">100% Core Map</span>
                    </div>
                    <div className="w-full bg-slate-105 bg-slate-100 h-2 rounded overflow-hidden border border-indigo-50">
                      <div className="w-full h-full bg-[#5c36cc] rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Testimonial mini grid */}
                <div className="mt-4 pt-4 border-t border-indigo-100">
                  <span className="text-[10px] font-mono text-orange-600 uppercase tracking-widest block mb-2.5 font-bold">What local teachers say:</span>
                  <p className="text-xs text-gray-650 text-gray-600 italic font-sans font-medium leading-relaxed">
                    "My middle schoolers actually debated logical circularity during lunch. They have became incredibly protective of their Argument Foundations. Best resource I have bought this decade."
                  </p>
                  <p className="text-[10px] font-bold text-indigo-950 font-sans mt-1.5">— Middle School Science Teacher, Sacramento CA</p>
                </div>
              </div>

              {/* Lead Collection Card column */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-2xl border border-indigo-100 space-y-4 shadow-lg text-left">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-orange-655 text-orange-600" />
                    <h3 className="text-base font-black font-sans text-indigo-950">Educator Procurement Center</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-normal font-sans">
                    Register below to unlock free digital assess handouts, sample printable fallacy templates, and purchase order quotes for your school district finance coordinators.
                  </p>

                  <form onSubmit={handleContactSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-indigo-950 font-bold block mb-1">School or Institution Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Sacramento Middle School" 
                        className="w-full bg-[#fafbfc] border border-indigo-100 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-orange-500 text-gray-900 font-medium"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-mono text-indigo-950 font-bold block mb-1">Contact Email</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="t.jenkins@school.ca" 
                          className="w-full bg-[#fafbfc] border border-indigo-100 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-orange-500 text-gray-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-mono text-indigo-950 font-bold block mb-1">Your Role</label>
                        <select 
                          value={institutionRole}
                          onChange={(e) => setInstitutionRole(e.target.value)}
                          className="w-full bg-[#fafbfc] border border-indigo-100 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:border-orange-500 text-gray-900 font-medium cursor-pointer"
                        >
                          <option value="parent">Parent</option>
                          <option value="teacher">Classroom Teacher</option>
                          <option value="principal">Administrator / Coordinator</option>
                          <option value="other">Hobbyist</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      id="btn-educator-submit"
                      className="w-full py-2.5 rounded-xl bg-[#5c36cc] hover:bg-[#4b27ba] text-white font-extrabold transition-all text-xs tracking-wide cursor-pointer flex items-center justify-center gap-1.5 shadow border border-[#4828ad]"
                    >
                      <span>Request Tax-Exempt Quote & Resources</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Feedback alerts */}
                  {contactSubmitted && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium">Thank you, Dakota will email back quotes or credentials within 1 business day!</span>
                    </div>
                  )}

                  <div className="text-[10px] font-mono text-gray-400 text-center pt-2">
                    Or directly email <span className="text-orange-600 font-bold">dakota@stayglassy.ca</span> (Quote desk)
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SHOP PAGE / PRODUCT LISTINGS */}
        <section id="shop" className="py-16 md:py-24 border-t border-indigo-100 bg-[#f4f6fa]/45">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Copy */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-orange-600 text-xs font-mono tracking-widest uppercase font-bold">
                Secure Procurement
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-sans text-indigo-950 tracking-tight">
                Acquire StayGlassy Decks
              </h2>
              <p className="text-gray-650 text-xs sm:text-sm leading-normal font-sans font-medium">
                Choose the baseline physical core pack for family play nights, or robust educator packs to equip whole school rosters with printable guides and licensing access.
              </p>
            </div>

            {/* Quantity Discount alert banner */}
            <div className="bg-white border border-indigo-100 p-4.5 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-200 text-orange-600">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-indigo-950 font-sans">Volume Institution Discounts Active:</h4>
                  <p className="text-[11px] text-[#4d566c] leading-normal font-sans font-medium">
                    Buy <strong className="text-orange-600">3 or more</strong> decks for <strong className="text-[#3b2dbf]">15% Off</strong>. Buy <strong className="text-orange-600">5 or more</strong> decks for <strong className="text-orange-600">25% Off</strong> entire cart!
                  </p>
                </div>
              </div>
              <a 
                href="#shop" 
                className="text-xs text-orange-600 hover:text-orange-500 font-mono flex items-center gap-1 cursor-pointer font-bold"
              >
                Inspect Price Structure <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-white rounded-2xl border border-indigo-100 overflow-hidden flex flex-col justify-between hover:border-orange-400 hover:shadow-lg transition-all duration-300 group text-left"
                >
                  <div>
                    {/* Placeholder image representation */}
                    <div className="h-44 bg-[#fafbfc] relative overflow-hidden flex items-center justify-center border-b border-indigo-50">
                      <div className="absolute w-[140px] h-[140px] bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all"></div>
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      {prod.originalPrice && (
                        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[9px] font-mono bg-orange-600 text-white font-extrabold shadow-sm">
                          Promo Offer
                        </span>
                      )}
                    </div>

                    {/* Metadata bar */}
                    <div className="p-4 border-b border-indigo-50 flex justify-between text-[10px] font-mono text-[#58647d] font-bold">
                      <span>{prod.players}</span>
                      <span>{prod.duration}</span>
                    </div>

                    {/* Body content */}
                    <div className="p-4 space-y-2 text-left">
                      <h3 className="text-sm sm:text-base font-black font-sans text-indigo-950 group-hover:text-orange-600 transition-colors">
                        {prod.name}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-indigo-950 font-mono">${prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-gray-400 line-through font-mono">${prod.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans line-clamp-3 font-medium">
                        {prod.description}
                      </p>

                      {/* Mini spec list */}
                      <ul className="pt-2 text-[10px] text-gray-500 space-y-1 font-sans">
                        {prod.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-orange-600 font-bold">•</span>
                            <span className="font-semibold text-indigo-950/75">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      id={`btn-add-cart-${prod.id}`}
                      onClick={() => addToCart(prod, 1)}
                      className="w-full py-2.5 rounded-xl bg-[#f4f6fa] border border-indigo-100 text-[#4c556b] group-hover:bg-orange-600 group-hover:text-white group-hover:border-transparent font-extrabold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Deck Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* REVIEWS & TESTIMONIALS SECTION */}
        <section className="py-16 md:py-24 border-t border-indigo-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-orange-600 text-xs font-mono uppercase tracking-widest font-extrabold font-sans">Social Proof</span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans text-indigo-950 tracking-tight">
                Trusted by California Classrooms
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-slate-50/50 p-5 rounded-2xl border border-indigo-50 flex flex-col justify-between text-left shadow-xs">
                  <div className="space-y-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic font-sans font-medium">
                      "{rev.content}"
                    </p>
                  </div>
                  <div className="mt-4 pt-3.5 border-t border-indigo-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xs border border-orange-100">
                      {rev.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-950">{rev.name}</p>
                      <p className="text-[10px] text-gray-400 font-sans font-bold">{rev.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ PAGE HUB */}
        <section id="faq" className="py-16 md:py-24 border-t border-indigo-100 bg-[#f4f6fa]/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-orange-600 text-xs font-mono uppercase font-bold">Answering Clear Questions</span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans text-indigo-950 tracking-tight">
                Frequently Asked Rules & Shipping Info
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm font-sans font-medium">
                Can't find your answer here? Click the floating virtual assistant in the bottom right corner for immediate help!
              </p>
            </div>

            <div className="bg-white/80 rounded-2xl border border-indigo-100 p-4.5 space-y-3">
              {FAQS.map((faq) => (
                <div 
                  key={faq.id} 
                  className="p-4 rounded-xl bg-white border border-indigo-50 text-left shadow-xs"
                >
                  <h4 className="text-xs sm:text-sm font-bold text-indigo-950 flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-orange-655 text-orange-600 flex-shrink-0" />
                    {faq.question}
                  </h4>
                  <p className="text-xs text-gray-650 mt-2 ml-6.5 leading-relaxed font-sans font-medium">
                    {faq.answer}
                  </p>
                  <div className="mt-2 ml-6.5">
                    <span className="text-[9px] font-mono text-orange-850 text-orange-700 font-bold uppercase bg-orange-50 border border-orange-100 px-2 py-0.5 rounded">
                      Category: {faq.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Return guidelines note */}
            <div className="mt-6 text-center text-xs text-gray-500 font-medium">
              Need classroom custom adaptations or larger box sets? Send a brief quote request form under <a href="#contact" className="text-orange-600 hover:underline font-bold">Contact details</a>!
            </div>
          </div>
        </section>

        {/* CONTACT PAGE & FORM */}
        <section id="contact" className="py-16 md:py-24 border-t border-indigo-100 bg-[#f4f6fa]/45">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Direct Details column */}
              <div className="lg:col-span-5 flex flex-col justify-between text-left bg-white p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-xs">
                <div className="space-y-6">
                  <div>
                    <span className="text-orange-600 text-xs font-mono uppercase tracking-widest block mb-1 font-bold font-sans">Get in Touch</span>
                    <h2 className="text-2xl sm:text-3xl font-black font-sans text-indigo-950 tracking-tight">
                      Connect with StayGlassy.ca
                    </h2>
                    <p className="text-gray-650 text-xs sm:text-sm mt-2 leading-relaxed font-sans font-medium">
                      We love communicating with teachers, parents, and tabletop game coordinators! Ask us anything regarding local school district orders, missing card replacements, or logical curricula.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5 text-gray-700 text-xs sm:text-sm">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-600">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-gray-400 uppercase font-bold">Direct Phone</p>
                        <a href="tel:4084312665" className="font-bold text-indigo-950">408-431-2665</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 text-gray-700 text-xs sm:text-sm">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-600">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-gray-400 uppercase font-bold">Support Email (Dakota)</p>
                        <a href="mailto:dakota@stayglassy.ca" className="font-bold text-indigo-950">dakota@stayglassy.ca</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 text-gray-700 text-xs sm:text-sm">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 text-orange-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-gray-400 uppercase font-bold">HQ Location</p>
                        <p className="font-bold text-indigo-950">Sacramento, California</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-indigo-50 mt-6 flex items-center justify-between text-[11px] text-gray-450 font-sans font-bold">
                  <span>© {new Date().getFullYear()} StayGlassy.ca</span>
                  
                  {/* Social Handles */}
                  <div className="flex gap-2.5">
                    <a href="#" className="p-1.5 rounded bg-slate-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                    <a href="#" className="p-1.5 rounded bg-slate-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
                    <a href="#" className="p-1.5 rounded bg-slate-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
                  </div>
                </div>
              </div>

              {/* Form Input column */}
              <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-indigo-100 flex flex-col justify-between text-left shadow-xs">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-indigo-950/70 block mb-1 font-bold">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Dr. Alexis Vance"
                        className="w-full bg-[#fafbfc] border border-indigo-100 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:border-orange-500 font-bold text-indigo-950 placeholder-gray-400 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono text-indigo-950/70 block mb-1 font-bold">Your Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="alexis@sacramento-edu.org"
                        className="w-full bg-[#fafbfc] border border-indigo-100 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:border-orange-500 font-bold text-indigo-950 placeholder-gray-400 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-indigo-950/70 block mb-1 font-bold">Inquiry Category</label>
                    <select 
                      className="w-full bg-[#fafbfc] border border-indigo-100 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:border-orange-500 font-bold text-indigo-950 cursor-pointer focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="school-order">School District Purchase Order / Quote Request</option>
                      <option value="gameplay">Game Rules & Card Adaptations Questions</option>
                      <option value="missing-cards">Replacement Request for Class Decks</option>
                      <option value="other">General Educational Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono text-indigo-950/70 block mb-1 font-bold">How can Dakota help you?</label>
                    <textarea 
                      required 
                      rows={4} 
                      placeholder="We are looking to purchase 12 Decks for our Middle School Science Olympiad club. Could you provide a formal quote for standard tax-exempt billing?"
                      className="w-full bg-[#fafbfc] border border-indigo-100 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:border-orange-500 font-medium text-indigo-950 resize-y focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-contact-submit"
                    className="w-full py-3.5 rounded-xl bg-orange-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-orange-500 shadow-md cursor-pointer transition-transform hover:scale-[1.01]"
                  >
                    Transmit Secured Message
                  </button>
                </form>

                {contactSubmitted && (
                  <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs sm:text-sm rounded-xl flex items-start gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-extrabold">Message Transmitted Successfully!</p>
                      <p className="text-emerald-700/80 text-xs mt-0.5">We processed your submission safely. Dakota will respond directly via email within 12-24 hours.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* NEWSLETTER CAPTURE FOOTER HUB */}
            <div className="mt-14 p-6 md:p-8 rounded-2xl bg-white border border-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6 text-left shadow-xs">
              <div className="max-w-md">
                <h4 className="text-sm sm:text-base font-black text-indigo-950 flex items-center gap-2 font-sans">
                  <Sparkles className="w-4 h-4 text-orange-600 animate-spin" />
                  Join StayGlassy Educational Updates
                </h4>
                <p className="text-xs text-slate-500 leading-normal mt-1 font-sans font-medium">
                  Receive our free bi-weekly printable bias activity worksheets, circular argument diagrams, and newly developed logical scenario cards. Cancel anytime.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="enter-scholar@domain.com"
                  required
                  className="bg-[#fafbfc] text-indigo-950 border border-indigo-100 px-3 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                />
                <button
                  type="submit"
                  id="btn-newsletter-submit"
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-extrabold rounded-xl whitespace-nowrap cursor-pointer transition-transform active:scale-95 shadow-sm"
                >
                  Join Circle
                </button>
              </form>

              {newsletterSubmitted && (
                <div className="absolute p-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-100 text-xs font-sans">
                  Joined successfully! Check your inbox soon for the printable fallacy cheatsheet.
                </div>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-indigo-100 py-12 text-[#58647d] text-center font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-indigo-50 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center font-mono text-[10px] font-black">
                G
              </div>
              <span className="font-extrabold text-[#0f172a] text-xs">StayGlassy.ca Sacramento</span>
            </div>
            
            <div className="text-xs text-slate-500 space-x-4 font-bold">
              <a href="#about" className="hover:text-orange-600">Dakota's Story</a>
              <span>•</span>
              <a href="#gameplay" className="hover:text-orange-600">Learning Outcomes</a>
              <span>•</span>
              <a href="#shop" className="hover:text-orange-600">Procurement Quotes</a>
              <span>•</span>
              <a href="#faq" className="hover:text-orange-600">Returns Matrix</a>
            </div>
          </div>

          <p className="text-xs tracking-wide text-slate-400 font-medium text-center">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-bold">iWebNext</a>
          </p>
        </div>
      </footer>

      {/* SCROLL-TO-TOP FLOATING TRIGGER BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="btn-scrollbar-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleScrollTop}
            className="fixed bottom-24 right-6 z-50 w-11 h-11 rounded-xl bg-white text-orange-600 border border-indigo-100 flex items-center justify-center shadow-md cursor-pointer hover:bg-orange-50 hover:text-orange-700 transition-all duration-300"
            title="Scroll back to zenith"
            aria-label="Scroll back layout up"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* SECURE CHATBOT INTERFACE */}
      <ChatbotWidget />

      {/* PRINTABLE RULES PREVIEW MODAL */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 bg-indigo-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-indigo-100 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-5 text-left relative shadow-2xl">
            
            <button
              id="btn-close-rules-modal"
              onClick={() => setIsRulesModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-indigo-950 hover:bg-slate-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-orange-605 text-orange-600 text-xs font-mono font-bold uppercase">Reference Card rules-preview.pdf</span>
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950 font-sans mt-0.5">StayGlassy Interactive Rule Summary</h3>
              <p className="text-gray-400 text-xs font-semibold">Standard instruction schema provided by iWebNext.</p>
            </div>

            <div className="bg-[#fafbfc] p-4 rounded-xl border border-indigo-50 space-y-4 text-xs sm:text-sm text-gray-750 leading-relaxed font-sans font-medium">
              <div>
                <h4 className="font-extrabold text-indigo-950">1. Setup</h4>
                <p>Divide players into 2 or 3 competing logic panels. Hand each panel 5 random 'Argument Foundations' and 3 active debate fallacy cards from the core deck.</p>
              </div>

              <div>
                <h4 className="font-extrabold text-[#111827]">2. Active Turns</h4>
                <p>On your turn, you can launch a debate. Propose an association from your Argument Foundations. If you suspect an circular or biased statement, deploy a relevant fallacy card (e.g. 'Post Hoc Ergo' or 'Confirmation Veil') straight from your hand.</p>
              </div>

              <div>
                <h4 className="font-extrabold text-[#111827]">3. Verification Referees</h4>
                <p>If challenged, teams must defense or discard the bias within 2 rounds of debate logic. Failing to defense discards the respective Foundation points. If verified error-free, score the card's points on your score record.</p>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 text-xs text-orange-700 font-bold">
                <strong>District Printing Tip:</strong> Educators can access pre-formatted Google Slides assessments inside their Educator Workspace directly on stayglassy.ca.
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-3 text-xs sm:text-sm">
              <button
                id="btn-rules-pdf-close"
                onClick={() => setIsRulesModalOpen(false)}
                className="px-4 py-2 border border-indigo-150 border-indigo-100 hover:bg-slate-50 text-gray-500 rounded-xl hover:text-indigo-950 cursor-pointer font-bold"
              >
                Close Rule Summary
              </button>
              <button
                id="btn-rules-pdf-download"
                onClick={() => {
                  alert("StayGlassy rules-preview.pdf has been simulated successfully! In production, this instantly triggers download of stayglassy_curriculum_rules_2026.pdf.");
                  setIsRulesModalOpen(false);
                }}
                className="px-4 py-2 bg-orange-600 text-white font-extrabold rounded-xl hover:bg-orange-500 cursor-pointer shadow-md"
              >
                Download PDF File
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SIMULATED CART SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end">
            
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-md h-full bg-[#fafbfc] border-l border-indigo-100 p-6 flex flex-col justify-between shadow-2xl z-10"
            >
              
              {/* Cart Drawer Header */}
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-indigo-100">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-orange-600 animate-pulse" />
                    <h3 className="text-base font-black text-indigo-950 font-sans">Secure Procurement Cart</h3>
                  </div>
                  <button
                    id="btn-close-cart-drawer"
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-indigo-950 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Discounts notifications alert */}
                {itemsCount > 0 && (
                  <div className="mt-3 p-2.5 bg-orange-50 text-orange-750 border border-orange-100 text-xs rounded-xl font-medium">
                    {discountPercent > 0 ? (
                      <span className="flex items-center gap-1.5 font-sans">
                        <Zap className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
                        <strong>{discountPercent}% Quantity Discount Triggered!</strong> Saved ${discountAmount.toFixed(2)}
                      </span>
                    ) : (
                      <span>Add <strong>{5 - itemsCount > 0 ? 5 - itemsCount : 0} more item(s)</strong> of selection to unlock full <strong>25% Educator Discount!</strong></span>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#55627a] gap-2.5">
                    <ShoppingCart className="w-10 h-10 text-indigo-200" />
                    <p className="text-xs sm:text-sm font-sans font-medium">Your procurement cart is empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs text-orange-650 text-orange-600 font-extrabold hover:underline"
                    >
                      Browse available packages below
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="p-3 bg-white rounded-xl border border-indigo-50 flex items-start gap-4">
                      
                      {/* Thumbnail wrapper */}
                      <div className="w-12 h-12 rounded bg-slate-50 overflow-hidden flex-shrink-0 border border-indigo-50">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Content details and stepper control */}
                      <div className="flex-1 space-y-1 text-left">
                        <div className="flex justify-between">
                          <h4 className="text-xs font-bold text-indigo-950 line-clamp-1">{item.product.name}</h4>
                          <span className="text-xs font-mono font-extrabold text-[#111827]">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-[#55627a]">Unit cost: ${item.product.price} USD</p>
                        
                        {/* Stepper controls */}
                        <div className="flex items-center gap-1.5 pt-1.5">
                          <button
                            onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-slate-100 border border-indigo-50 text-[#374151] text-xs flex items-center justify-center cursor-pointer hover:bg-slate-200"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono px-2 font-black">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-slate-100 border border-indigo-50 text-[#374151] text-xs flex items-center justify-center cursor-pointer hover:bg-slate-200"
                          >
                            +
                          </button>
                          
                          <button
                            onClick={() => updateCartQty(item.product.id, 0)}
                            className="text-[10px] text-gray-400 hover:text-red-500 font-mono ml-auto cursor-pointer font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Cart Totals, Simulated Billing checkout forms */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-indigo-100 space-y-4">
                  
                  {/* Totals receipt items */}
                  <div className="space-y-1.5 text-xs text-gray-650 font-medium text-left">
                    <div className="flex justify-between">
                      <span>Total Decks count:</span>
                      <span className="font-mono text-indigo-950 font-bold">{itemsCount} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cart Subtotal:</span>
                      <span className="font-mono text-indigo-950 font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-orange-600 font-bold">
                        <span>Quantity Discount ({discountPercent}%):</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-indigo-950 font-extrabold border-t border-indigo-50 pt-2 text-sm">
                      <span>Verified Total Cost:</span>
                      <span className="font-mono text-[#111827]">${finalTotal.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Simulate Checkout fields */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 bg-white p-3 rounded-xl border border-indigo-50 text-left shadow-xs">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#55627a]/85 block mb-1 font-bold">
                      Billing PO Placeholder
                    </span>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        required 
                        placeholder="Reconciliation ID / Card" 
                        className="bg-[#fafbfc] border border-indigo-100 px-2.5 py-1.5 text-[11px] rounded text-indigo-950 placeholder-gray-400 focus:outline-none"
                      />
                      <input 
                        type="email" 
                        required 
                        placeholder="District Billing Email" 
                        className="bg-[#fafbfc] border border-indigo-100 px-2.5 py-1.5 text-[11px] rounded text-indigo-950 placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      id="btn-cart-simulate-check"
                      disabled={isCheckingOut}
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs rounded transition-transform cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-sm"
                    >
                      {isCheckingOut ? (
                        <span>Simulating Authorization...</span>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Simulate Secure Checkout</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-[10px] font-mono text-gray-405 text-[#55627a] text-center pb-2">
                    Secured connection using TLS standards & school-district routing rules.
                  </div>
                </div>
              )}

              {/* Complete checkout notification */}
              {checkoutComplete && (
                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center gap-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600 font-bold shadow-xs">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-indigo-950">Simulated checkout successfully!</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm leading-relaxed font-sans font-medium">
                      Your StayGlassy package has been scheduled for immediate shipment. In the production app, this triggers API routing to authorize credit logs and notifies Dakota at dakota@stayglassy.ca.
                    </p>
                  </div>
                  <button
                    onClick={() => setCheckoutComplete(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-indigo-50 text-gray-700 text-xs font-mono font-bold rounded cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
