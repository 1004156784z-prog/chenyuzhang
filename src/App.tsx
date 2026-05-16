/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Linkedin, 
  Mail, 
  Phone, 
  Instagram, 
  Settings2,
  ChevronRight,
  Monitor,
  Music,
  PenTool,
  Trophy,
  X,
  MessageCircle,
  MessageSquare
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  EDUCATION, 
  EXPERIENCE, 
  PROJECTS, 
  SKILLS,
  VISUAL_PORTFOLIO,
  PORTFOLIO_DOCS,
  ANIMATION_CONFIGS,
  TRANSLATIONS
} from './constants';

type AnimationStyle = keyof typeof ANIMATION_CONFIGS;

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [animStyle, setAnimStyle] = useState<AnimationStyle>('soft');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedGallery, setSelectedGallery] = useState<typeof VISUAL_PORTFOLIO[0] | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const t = TRANSLATIONS[lang];
  const currentAnim = ANIMATION_CONFIGS[animStyle];

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink selection:bg-brand-accent selection:text-brand-bg cursor-none">
      {/* Glow Frosted Glass Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center shadow-[0_0_20px_rgba(var(--brand-accent-rgb),0.3)]"
        animate={{ x: mousePos.x - 20, y: mousePos.y - 20, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-brand-accent rounded-full shadow-[0_0_10px_#ccff00]" />
      </motion.div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-brand-bg/95 backdrop-blur-2xl flex flex-col justify-center items-center p-6 md:p-24"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedGallery(null)}
              className="absolute top-12 right-12 text-brand-ink hover:text-brand-accent transition-colors z-[130]"
            >
              <X size={48} />
            </motion.button>

            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-7xl w-full"
            >
              <div className="mb-12 text-center">
                <span className="luxury-label text-brand-accent mb-4 block">{selectedGallery.category}</span>
                <h2 className="text-5xl md:text-7xl font-serif italic mb-6">{selectedGallery.title[lang]}</h2>
                <p className="text-brand-muted max-w-2xl mx-auto">{selectedGallery.description[lang]}</p>
              </div>

              <div className={`gap-8 px-4 ${selectedGallery.id === 'others' ? 'flex flex-col items-center overflow-y-auto max-h-[85vh] py-8 custom-scrollbar' : 'flex overflow-x-auto pb-12 snap-x no-scrollbar'}`}>
                {selectedGallery.id === 'others' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-16 w-full max-w-2xl"
                  >
                    <a 
                      href="/src/assets/images/portfolio.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-between p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-700 hover:bg-white/10 hover:border-brand-accent/50 hover:shadow-brand-accent/10"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="relative z-10 flex items-center gap-8">
                        <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-bg group-hover:rotate-12 transition-all duration-700 shadow-xl">
                          <ArrowUpRight size={40} />
                        </div>
                        <div className="text-left">
                          <h4 className="text-3xl font-serif italic mb-2 tracking-tight">
                            {lang === 'zh' ? '作品集 PDF 原件' : 'Curriculum Vitae / PDF'}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-muted font-medium">
                              {lang === 'zh' ? '完整作品集 / 高清未压缩' : 'Full Portfolio / High Fidelity'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="relative z-10 text-[11px] uppercase tracking-[0.6em] text-brand-accent opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-700 font-bold">
                        {lang === 'zh' ? '立即探索' : 'Explore Now'}
                      </div>
                    </a>
                  </motion.div>
                )}

                {selectedGallery.images.map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, [selectedGallery.id === 'others' ? 'y' : 'x']: 50 }}
                    animate={{ opacity: 1, [selectedGallery.id === 'others' ? 'y' : 'x']: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`${
                      selectedGallery.id === 'others' 
                        ? 'w-full md:w-[90%] lg:w-[80%] aspect-[16/9] mb-8 last:mb-0' 
                        : 'min-w-[70vw] md:min-w-[320px] aspect-[9/16]'
                    } bg-brand-neutral overflow-hidden shadow-2xl relative border-[4px] border-[#1a1a1a] rounded-[2rem] group transition-all duration-500 hover:border-brand-accent/40 ring-1 ring-white/10`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]" 
                      referrerPolicy="no-referrer"
                    />
                    {/* Professional Reflection */}
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none opacity-50" />
                  </motion.div>
                ))}
              </div>
              
              {selectedGallery.images.length > 0 && (
                <div className="flex justify-center gap-4 mt-8">
                  <div className="w-24 h-px bg-brand-accent/30" />
                  <span className="text-[10px] uppercase tracking-[0.5em] text-brand-muted">
                    {selectedGallery.id === 'others' ? 'Scroll down to explore' : 'Swipe to explore'}
                  </span>
                  <div className="w-24 h-px bg-brand-accent/30" />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customizer Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCustomizer(!showCustomizer)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-brand-accent text-brand-bg rounded-full shadow-2xl flex items-center justify-center border border-white/20"
        id="customizer-toggle"
      >
        <Settings2 className="w-6 h-6" />
      </motion.button>

      {/* Customizer Panel */}
      <AnimatePresence>
        {showCustomizer && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-8 z-50 w-64 bg-brand-neutral/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl"
          >
            <h4 className="luxury-label mb-6 opacity-60">Custom Controls</h4>
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-muted mb-3 block">Language</span>
                <div className="grid grid-cols-2 gap-2">
                  {['zh', 'en'].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l as 'zh' | 'en')}
                      className={`py-2 rounded-lg text-[10px] font-bold tracking-widest border transition-all ${
                        lang === l ? 'bg-brand-accent border-brand-accent text-brand-bg' : 'bg-white/5 border-white/10 text-brand-muted'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-muted mb-3 block">Interaction</span>
                <div className="space-y-2">
                  {(Object.keys(ANIMATION_CONFIGS) as AnimationStyle[]).map((style) => (
                    <button
                      key={style}
                      onClick={() => setAnimStyle(style)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                        animStyle === style 
                        ? 'bg-brand-accent/20 border-brand-accent text-brand-accent font-medium' 
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-brand-muted font-light'
                      }`}
                    >
                      <span className="capitalize text-[10px] tracking-widest">{style}</span>
                      {animStyle === style && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <span className="text-[9px] uppercase opacity-40 mb-2 block">System Online</span>
              <div className="flex gap-1">
                <div className="w-full h-1 bg-brand-accent" />
                <div className="w-full h-1 bg-brand-accent/30" />
                <div className="w-full h-1 bg-brand-accent/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} lang={lang} setLang={setLang} />

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="section-container min-h-screen flex flex-col pt-32 p-6 md:p-12 overflow-hidden">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center">
              <motion.div {...currentAnim}>
                <p className="text-brand-accent text-xs uppercase tracking-widest mb-4 italic">
                  {t.hero.school}
                </p>
                <h1 className="mb-12 flex flex-col items-start">
                  {lang === 'zh' ? (
                    <>
                      <span className="text-[18vw] sm:text-[14vw] lg:text-[8rem] xl:text-[10rem] font-light tracking-tighter leading-none uppercase">{PERSONAL_INFO.nameZh}</span>
                      <span className="text-[6vw] sm:text-[4vw] lg:text-[2.5rem] font-serif italic tracking-widest text-brand-accent mt-2 opacity-80 uppercase leading-none">Chenyu Zhang</span>
                    </>
                  ) : (
                    <div className="text-[18vw] sm:text-[14vw] lg:text-[8rem] xl:text-[10rem] font-light tracking-tighter leading-[0.85] uppercase flex flex-col">
                      {PERSONAL_INFO.name.split(' ')[0]} 
                      <span className="italic font-serif opacity-90 text-[16vw] sm:text-[12vw] lg:text-[7rem] xl:text-[9rem]">{PERSONAL_INFO.name.split(' ')[1]}</span>
                    </div>
                  )}
                </h1>
                <div className="h-[1px] w-24 bg-brand-accent/50 mb-12"></div>
                <p className="text-lg md:text-xl text-brand-muted leading-relaxed font-light pr-0 lg:pr-12 max-w-lg mb-12">
                  {lang === 'zh' ? (
                    <>数字化研究与交互设计的桥梁。基于 <span className="text-brand-ink">南安普顿大学</span> 课程体系。打造极具传播力的数字化内容。表现多维叙事。</>
                  ) : (
                    <>A creative practitioner bridging the gap between <span className="text-brand-ink">{t.hero.research}</span> and <span className="text-brand-ink">{t.hero.interactive}</span>. Based on the UoS curriculum framework.</>
                  )}
                </p>

                <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-ink group-hover:text-brand-bg transition-all duration-500"
                  >
                    <ChevronRight className="w-6 h-6 rotate-90" />
                  </motion.div>
                  <span className="uppercase text-[10px] tracking-[0.3em] font-medium opacity-60">{t.hero.scroll}</span>
                </div>
              </motion.div>
            </div>

            {/* Documentation Grid */}
            <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {PORTFOLIO_DOCS.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => {
                    if (doc.id === "03") {
                      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group relative bg-brand-neutral/40 border border-white/5 p-8 flex flex-col justify-between hover:border-brand-accent/30 hover:bg-brand-neutral/60 transition-all duration-500 rounded-px overflow-hidden cursor-pointer"
                >
                  <motion.div 
                    className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-700"
                  />
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-100 group-hover:text-brand-accent transition-all duration-700">
                    <span className="text-5xl font-serif italic">{doc.id}</span>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-2">{t.labels.docLabel} {doc.id}</h3>
                    <h2 className="text-2xl font-serif tracking-tight group-hover:text-brand-accent transition-colors italic line-clamp-1">{doc.title[lang]}</h2>
                    <p className="text-xs text-brand-muted leading-relaxed font-light min-h-[3rem]">{doc.description[lang]}</p>
                  </div>
                  <div className="relative z-10 mt-8 text-[10px] border-t border-white/10 pt-6 flex justify-between items-center uppercase tracking-widest font-medium">
                    <span className="opacity-40">{doc.format}</span>
                    <span className="text-brand-accent group-hover:tracking-[0.2em] transition-all">{doc.action[lang]}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* IDENTITY: 01. THE PROFILE */}
        <section id="profile" className="section-container border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-12 lg:col-span-4">
              <span className="luxury-label text-brand-accent opacity-80 font-bold">01. Identity</span>
              <h2 className="text-5xl md:text-7xl font-light italic leading-none">{lang === 'zh' ? <>身份<br/>叙事</> : <>The <br/>Narrative</>}</h2>
            </div>
            <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/5] bg-brand-neutral overflow-hidden relative group rounded-2xl border border-white/5"
              >
                <img 
                  src={PERSONAL_INFO.avatar} 
                  alt={PERSONAL_INFO.name} 
                  className="w-full h-full object-cover brightness-90 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="space-y-12 py-4">
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif italic border-b border-white/10 pb-6 flex items-center justify-between group">
                    {lang === 'zh' ? "核心愿景" : "Core Vision"}
                    <ArrowUpRight className="w-6 h-6 text-brand-accent opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-brand-muted font-light leading-relaxed text-lg">
                    {PERSONAL_INFO.bio[lang]}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-1">
                    <span className="luxury-label opacity-40">{t.labels.reach}</span>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-5xl font-serif italic text-brand-accent tracking-tighter"
                    >
                      100M+
                    </motion.p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-2">{lang === 'zh' ? "累计播放量" : "Cumulative Plays"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="luxury-label opacity-40">{t.labels.network}</span>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-5xl font-serif italic text-brand-accent tracking-tighter"
                    >
                      40K
                    </motion.p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted mt-2">{lang === 'zh' ? "核心用户群" : "Active Followers"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* VIRTUAL GALLERY SECTION */}
        <section id="gallery" className="section-container border-t border-white/10">
          <div className="flex flex-col mb-24">
            <span className="luxury-label text-brand-accent">02. Visuals</span>
            <h2 className="text-6xl md:text-8xl font-light italic leading-none">{lang === 'zh' ? <>社交媒体<br/>视觉作品</> : <>Social Media<br/><span className="text-brand-accent">Showcase</span></>}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISUAL_PORTFOLIO.map((item, idx) => (
              <motion.div
                key={item.id}
                {...currentAnim}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedGallery(item)}
                className="group relative h-[600px] overflow-hidden rounded-2xl border border-white/5 cursor-pointer"
              >
                <img 
                  src={item.mainImage} 
                  alt={item.title[lang]} 
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="luxury-label text-brand-accent mb-2 block opacity-60 uppercase">{item.category}</span>
                  <h3 className="text-3xl font-serif italic mb-4">{item.title[lang]}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed font-light opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {item.description[lang]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* NARRATIVE: 02. EXPERIENCE & FILTERED PROJECTS */}
        <section id="experience" className="bg-[#0c0c0c] border-y border-white/5 overflow-hidden">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-12 mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div>
                  <span className="luxury-label text-brand-accent">02. Career</span>
                  <h2 className="text-6xl md:text-8xl font-light italic leading-none">{lang === 'zh' ? <>专业<br/><span className="text-brand-accent">历程</span></> : <>Professional<br/><span className="text-brand-accent">Pathways</span></>}</h2>
                </div>
                
                {/* Filter Controls */}
                <div className="flex flex-wrap gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all duration-500 ${
                        activeFilter === cat 
                        ? 'bg-brand-accent border-brand-accent text-brand-bg' 
                        : 'border-white/10 text-brand-muted hover:border-white/30'
                      }`}
                    >
                      {cat === 'All' ? t.labels.filterAll : cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-5 space-y-4">
                {EXPERIENCE.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    {...currentAnim}
                    transition={{ delay: idx * 0.1 }}
                    className="p-10 bg-brand-neutral/30 border border-white/5 hover:border-brand-accent/40 transition-all duration-500 group rounded-2xl"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent px-3 py-1 border border-brand-accent/20 rounded-full">{exp.period}</span>
                    </div>
                    <h4 className="text-3xl font-serif italic mb-2 tracking-tight">{exp.role[lang]}</h4>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-muted mb-6">{exp.company[lang]}</p>
                    <p className="text-sm font-light leading-relaxed text-brand-muted group-hover:text-brand-ink transition-colors">
                      {exp.description[lang]}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-7 mt-12 lg:mt-0 space-y-16 lg:pl-16 relative">
                <AnimatePresence mode="popLayout">
                  <motion.div 
                    key={activeFilter}
                    className="space-y-16"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {filteredProjects.map((proj, idx) => (
                      <motion.div
                        key={`${proj.id}-${idx}`}
                        className="group border-b border-white/5 pb-16 last:border-0"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-8 h-px bg-brand-accent group-hover:w-16 transition-all duration-700" />
                          <span className="luxury-label text-brand-accent mb-0 uppercase">{proj.category}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight group-hover:pl-4 transition-all duration-500">{proj.title[lang]}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-8 opacity-60">
                          {proj.tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-widest font-bold border border-white/10 px-3 py-1 rounded-full">{tag}</span>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {proj.achievements[lang].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-brand-muted font-light text-sm italic">
                              <div className="w-1 h-1 rounded-full bg-brand-accent" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* MASTERY: 03. TOOLS */}
        <section id="tools" className="section-container">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
            <div className="max-w-7xl">
              <span className="luxury-label text-brand-accent opacity-80">03. Mastery</span>
              <h2 className="text-6xl md:text-9xl font-light italic leading-[0.8] mb-0 tracking-tighter uppercase line-clamp-2">
                {lang === 'zh' ? <>工具<br/><span className="text-brand-accent">矩阵</span></> : <>The <br/><span className="text-brand-accent">Toolkit</span></>}
              </h2>
            </div>
            <p className="text-brand-muted font-light max-w-sm text-lg leading-relaxed lg:text-right border-r-0 lg:border-r border-brand-accent/30 pr-0 lg:pr-8">
              {t.footer.desc} {lang === 'zh' ? '多维度作品集呈现。' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILLS.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-brand-neutral/20 border border-white/5 hover:border-brand-accent/20 transition-all duration-700 rounded-pixel"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-bounce" />
                  <h5 className="font-serif italic text-2xl group-hover:text-brand-accent transition-colors">{skillGroup.category[lang]}</h5>
                </div>
                <div className="flex flex-col gap-4">
                  {skillGroup.items.map(skill => (
                    <div 
                      key={skill} 
                      className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-brand-accent transition-all cursor-none pb-2 border-b border-white/5"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CALL: CONTACT */}
        <section id="contact" className="relative section-container text-center pt-64 pb-96 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-[0.02]">
            <span className="text-[30vw] font-serif italic whitespace-nowrap uppercase tracking-tighter">{lang === 'zh' ? '交流互动' : 'Collaborate'}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="luxury-label font-bold text-brand-accent tracking-[0.5em] mb-12">{t.labels.available}</span>
            <h2 className="text-7xl md:text-[14vw] font-serif italic leading-none tracking-tighter mb-24 transition-all uppercase">
              {lang === 'zh' ? "建立联系" : "Connect"}
            </h2>
            
            <div className="flex flex-col items-center gap-12">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-brand-bg transition-all duration-500 group-hover:scale-110">
                  <Mail size={40} strokeWidth={1} />
                </div>
                <span className="text-2xl md:text-4xl font-light tracking-tight group-hover:italic transition-all">{PERSONAL_INFO.email}</span>
              </a>

              <div className="flex gap-16 mt-12">
                {[
                  { icon: MessageCircle, label: t.labels.wechat },
                  { icon: MessageSquare, label: t.labels.qq },
                  { icon: ArrowUpRight, label: lang === 'zh' ? "简历" : "Resume" }
                ].map((social, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="p-4 rounded-full border border-white/5 group-hover:border-brand-accent/50 group-hover:text-brand-accent transition-all duration-300">
                      <social.icon size={24} strokeWidth={1} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 group-hover:opacity-100 group-hover:text-brand-accent transition-all">{social.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="px-6 md:px-12 py-12 flex flex-col items-center md:items-end md:flex-row justify-between border-t border-white/5 text-[9px] uppercase tracking-[0.4em] font-medium text-brand-muted bg-[#080808]">
        <div className="space-y-4 mb-12 md:mb-0">
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center rotate-45">
              <span className="-rotate-45 font-serif font-bold text-lg text-brand-accent italic">ZC</span>
            </div>
            <p className="opacity-60 leading-relaxed max-w-xs text-center md:text-left">
              © 2026 Developed for {PERSONAL_INFO.name}. <br/>
              Southampton Alumni Network Integration.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-12 items-center md:items-end">
          <div className="flex flex-col items-center sm:items-end">
            <span className="opacity-40 mb-2">{t.footer.lang}</span>
            <div className="flex gap-4 text-[10px] tracking-widest text-brand-ink">
              <button 
                onClick={() => setLang('en')}
                className={`transition-all hover:opacity-100 ${lang === 'en' ? 'text-brand-accent font-bold opacity-100' : 'opacity-30'}`}
              >EN</button>
              <button 
                onClick={() => setLang('zh')}
                className={`transition-all hover:opacity-100 ${lang === 'zh' ? 'text-brand-accent font-bold opacity-100' : 'opacity-30'}`}
              >CN</button>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end">
             <span className="opacity-40 mb-2">{t.footer.edition}</span>
             <span className="text-brand-ink">UoS / MA Digital Media</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Navigation({ isMenuOpen, setIsMenuOpen, lang, setLang }: { 
  isMenuOpen: boolean, 
  setIsMenuOpen: (v: boolean) => void,
  lang: 'zh' | 'en',
  setLang: (v: 'zh' | 'en') => void
}) {
  const [scrolled, setScrolled] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.works, id: 'experience' },
    { name: t.nav.identity, id: 'profile' },
    { name: t.nav.docs, id: 'hero' }, 
    { name: t.nav.toolkit, id: 'tools' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[80] px-6 md:px-12 py-8 transition-all duration-700 ${scrolled ? 'backdrop-blur-xl bg-brand-bg/90 border-b border-white/5 py-6 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-6"
        >
          <div className="w-10 h-10 border border-brand-accent/40 flex items-center justify-center rotate-45 bg-white/5 group hover:rotate-0 transition-all duration-700">
            <span className="-rotate-45 group-hover:rotate-0 transition-all font-serif font-bold text-xl text-brand-accent italic">ZC</span>
          </div>
          <div className="hidden lg:flex flex-col uppercase tracking-[0.3em] font-bold text-[9px] opacity-40">
            <span>Portfolio</span>
            <span className="text-brand-accent">2026 Archive</span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-16 items-center">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brand-accent opacity-40 hover:opacity-100 transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
            </a>
          ))}
          
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="px-4 py-1.5 border border-white/10 rounded-full flex items-center gap-2 bg-white/5 cursor-pointer hover:bg-brand-accent hover:text-brand-bg transition-all group overflow-hidden"
          >
             <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse group-hover:bg-brand-bg"></span>
             <span className="text-[10px] uppercase font-bold tracking-widest">{lang.toUpperCase()}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-2 focus:outline-none group p-2 relative z-[90]"
        >
          <span className={`w-8 h-[2px] bg-brand-ink transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`w-8 h-[2px] bg-brand-ink transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen bg-brand-bg flex flex-col justify-center items-center gap-8 md:hidden z-[85] text-brand-ink bg-brand-neutral"
          >
            {navItems.map((item, i) => (
              <motion.a 
                key={item.id} 
                href={`#${item.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif italic hover:text-brand-accent transition-all uppercase"
              >
                {item.name}
              </motion.a>
            ))}
            <div className="absolute bottom-20 flex gap-6">
               <button onClick={() => setLang('zh')} className={`p-4 rounded-full border ${lang === 'zh' ? 'bg-brand-accent border-brand-accent text-brand-bg' : 'border-white/10'}`}>CN</button>
               <button onClick={() => setLang('en')} className={`p-4 rounded-full border ${lang === 'en' ? 'bg-brand-accent border-brand-accent text-brand-bg' : 'border-white/10'}`}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

