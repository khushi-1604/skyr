import { motion, useScroll, useTransform } from 'motion/react';
import { MousePointer2, Play, Users, Clock, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const VideoGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cards = [
    { title: "Neon Dreams", category: "Commercial", src: "/assets/video1.mp4" },
    { title: "Echoes", category: "Short Film", src: "/assets/video3.MOV" },
    { title: "Velocity", category: "Automotive", src: "/assets/video4.MP4" },
    { title: "Urban Pulse", category: "Documentary", src: "/assets/video5.MP4" },
    { title: "Ascension", category: "Music Video", src: "/assets/video6.MOV" }
  ];

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full bg-black block" id="timeline">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-[1000px]">

        {/* Background ambient light */}
        <div className="absolute inset-0 bg-brand-purple/10 blur-[150px] pointer-events-none" />

        <div className="absolute top-12 left-6 md:top-20 md:left-12 z-30 pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white drop-shadow-2xl">
            The Archive
          </h2>
          <div className="h-1 w-24 bg-brand-purple mt-4 shadow-[0_0_20px_rgba(168,85,247,0.8)]" />
        </div>

        {/* Gallery Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          {cards.map((card, i) => {
            const times = cards.map((_, idx) => idx / (cards.length - 1));

            const xValues = times.map(t => {
              const positionIndex = i - (t * (cards.length - 1));
              return `${positionIndex * 60}vw`;
            });

            const scaleValues = times.map(t => {
              const positionIndex = Math.abs(i - (t * (cards.length - 1)));
              return positionIndex === 0 ? 1 : 0.75;
            });

            const opacityValues = times.map(t => {
              const positionIndex = Math.abs(i - (t * (cards.length - 1)));
              return positionIndex === 0 ? 1 : 0.3;
            });

            const zValues = times.map(t => {
              const positionIndex = Math.abs(i - (t * (cards.length - 1)));
              return positionIndex === 0 ? "0px" : "-300px";
            });

            const x = useTransform(scrollYProgress, times, xValues);
            const scale = useTransform(scrollYProgress, times, scaleValues);
            const opacity = useTransform(scrollYProgress, times, opacityValues);
            const z = useTransform(scrollYProgress, times, zValues);

            return (
              <motion.div
                key={i}
                style={{ x, scale, opacity, z, position: 'absolute', transformStyle: 'preserve-3d' }}
                className="w-[85vw] md:w-[50vw] aspect-[9/16] md:aspect-[9/16] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 group cursor-pointer"
              >
                <video
                  src={card.src}
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-[10px] md:text-xs uppercase tracking-widest font-bold border border-white/10">
                        {card.category}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Focus outline gradient */}
                <div className="absolute inset-0 border-2 border-brand-purple/0 group-hover:border-brand-purple/50 rounded-2xl md:rounded-[2rem] transition-colors duration-500 pointer-events-none" />

              </motion.div>
            )
          })}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
          <span className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest font-bold">Discover</span>
          <div className="w-24 md:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden flex">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-blue to-brand-purple origin-left"
              style={{ scaleX: scrollYProgress, width: '100%' }}
            />
          </div>
        </div>

      </div>
    </section>
  )
}

const PhotoGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const photos = [
    { src: "/assets/1.jpeg", title: "Editorial" },
    { src: "/assets/2.jpeg", title: "Portraits" },
    { src: "/assets/3.jpeg", title: "Landscapes" },
    { src: "/assets/4.JPEG", title: "Street" },
    { src: "/assets/5.jpeg", title: "Concept" },
    { src: "/assets/6.jpeg", title: "Depth" },
    { src: "/assets/7.jpeg", title: "Vision" }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-black block" style={{ height: `${photos.length * 100}vh` }} id="stills">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1500px]">

        <div className="absolute inset-0 bg-brand-blue/5 blur-[120px] pointer-events-none" />

        <div className="absolute top-12 right-6 md:top-20 md:right-12 z-40 pointer-events-none text-right">
          <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white drop-shadow-2xl">
            Stills
          </h2>
          <div className="h-1 w-24 bg-brand-blue mt-4 ml-auto shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
        </div>

        <div className="relative w-[85vw] md:w-[45vw] aspect-[3/4] md:aspect-[4/5] flex items-center justify-center mt-12 md:mt-0">
          {photos.map((photo, i) => {
            const total = photos.length;
            const threshold = i / total;
            const exitThreshold = Math.min(1, (i + 1) / total);

            const times = Array.from({ length: total + 1 }, (_, idx) => idx / total);

            const yValues = times.map(t => {
              if (t >= exitThreshold) return "-120vh";
              if (t >= threshold) {
                const normalizedProgress = (t - threshold) / (exitThreshold - threshold || 1);
                return `-${normalizedProgress * 120}vh`;
              }
              const offset = (threshold - t) * 100;
              return `${offset}px`;
            });

            const scaleValues = times.map(t => {
              if (t >= threshold) return 1;
              const distance = threshold - t;
              return Math.max(0.7, 1 - (distance * 0.4));
            });

            const opacityValues = times.map(t => {
              if (t >= exitThreshold) return 0;
              if (t >= threshold) {
                const normalizedProgress = (t - threshold) / (exitThreshold - threshold || 1);
                return Math.max(0, 1 - (normalizedProgress * 2));
              }
              return 1;
            });

            const rotateZValues = times.map(t => {
              if (t >= threshold) {
                const normalizedProgress = (t - threshold) / (exitThreshold - threshold || 1);
                const dir = i % 2 === 0 ? -1 : 1;
                return normalizedProgress * dir * 25;
              }
              const dir = i % 2 === 0 ? -1 : 1;
              return dir * (threshold - t) * 8;
            });

            const rotateXValues = times.map(t => {
              if (t >= threshold) {
                const normalizedProgress = (t - threshold) / (exitThreshold - threshold || 1);
                return normalizedProgress * 60;
              }
              return 0;
            });

            const zValues = times.map(t => {
              if (t >= threshold) return "0px";
              const distance = threshold - t;
              return `-${distance * 400}px`;
            });

            const y = useTransform(scrollYProgress, times, yValues);
            const scale = useTransform(scrollYProgress, times, scaleValues);
            const opacity = useTransform(scrollYProgress, times, opacityValues);
            const rotateZ = useTransform(scrollYProgress, times, rotateZValues);
            const rotateX = useTransform(scrollYProgress, times, rotateXValues);
            const z = useTransform(scrollYProgress, times, zValues);

            return (
              <motion.div
                key={i}
                style={{
                  y, scale, opacity, rotateZ, rotateX, z,
                  position: 'absolute',
                  zIndex: total - i,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'bottom center'
                }}
                className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-white/10 group bg-zinc-900"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 pointer-events-none">
                  <span className="text-brand-blue text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-3 block opacity-80">
                    {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                  <h3 className="text-4xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter opacity-95">
                    {photo.title}
                  </h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] py-32 flex items-center justify-center px-6 md:px-12 overflow-hidden bg-black block" id="about">
      {/* Abstract Background Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[85rem] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">

        {/* Left: Image Container (spans 5 cols) */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10"
          >
            <img
              src="/assets/corbeen.JPEG"
              alt="Corbeen - Managing Director"
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-[1s]"
            />

            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]" />
                <span className="text-white text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Managing Director</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Content (spans 7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, rotateX: 90, y: 40 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: "bottom" }}
            className="mb-12"
          >
            <h3 className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.4em] font-bold mb-4 md:mb-6">The Mind Behind The Lens</h3>
            <h2 className="text-7xl md:text-[8rem] font-display font-bold text-white tracking-tighter leading-[0.85] mix-blend-difference">
              CORBEEN
            </h2>
          </motion.div>

          <div className="space-y-6 md:space-y-8 flex flex-col items-start border-l border-white/10 pl-6 md:pl-12 ml-2 md:ml-4">
            {[
              "Hey, I’m Corbeen, Founder & Managing Director of Skyr.",
              "At 19, I’ve had the opportunity to work with 100+ clients across Rajkot and Ahmedabad.",
              "I help brands shape their identity through storytelling, visuals, and strategy.",
              "Skyr was built on a simple belief: brands shouldn’t stay grounded.",
              "They should rise, stand out, and lead.",
              "Everything I create is driven by purpose, clarity, and bold vision."
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.15), ease: "easeOut" }}
                className="text-zinc-400 text-base md:text-xl font-light tracking-wide leading-relaxed max-w-2xl hover:text-white transition-colors duration-300"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default function Overlay() {
  return (
    <div className="relative z-10 w-full">
      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col items-center justify-center px-6" id="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.5em] text-brand-purple mb-4 block font-display">Video Editor & Cinematographer</span>
          <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-4">SKYR</h1>
          <p className="text-zinc-500 max-w-md mx-auto text-sm md:text-base leading-relaxed italic">
            “Built for Brands that are meant to Rise”
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: VIDEO GALLERY */}
      <VideoGallery />

      {/* SECTION 3: OBSESSION */}
      <section className="h-screen flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm" id="obsession">
        <div className="text-center obsession-content">
          <h2 className="text-5xl md:text-8xl font-display font-bold glitch-text mb-4 uppercase tracking-tighter">Curiosity turned into obsession.</h2>
        </div>
      </section>

      {/* SECTION 4 & 5: EXPANSION & PROOF */}
      <section className="min-h-screen py-32 px-6 flex flex-col items-center justify-center" id="proof">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
          <div className="space-y-6">
            <h3 className="text-zinc-500 uppercase tracking-widest text-xs font-display">Expansion</h3>
            <h2 className="text-4xl font-display font-bold">Pushing the boundaries of digital narrative.</h2>
            <p className="text-zinc-400 leading-relaxed">
              Every frame is a decision. Every cut is a beat. My expansion into high-tier content creation was fueled by a relentless desire to perfect the flow.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-12">
            <div className="stat-card">
              <div className="flex items-center gap-4 mb-2">
                <Users className="text-brand-purple w-6 h-6" />
                <span className="text-5xl font-display font-bold">100+</span>
              </div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">Global Clients</p>
            </div>
            <div className="stat-card">
              <div className="flex items-center gap-4 mb-2">
                <Clock className="text-brand-blue w-6 h-6" />
                <span className="text-5xl font-display font-bold">2+</span>
              </div>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ABOUT ME */}
      <AboutSection />

      {/* SECTION 7: PHILOSOPHY */}
      <section className="h-screen flex items-center justify-center px-6" id="philosophy">
        <div className="max-w-4xl space-y-4 philosophy-text">
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-none">I don’t just edit videos.</h2>
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-none text-brand-purple">I build stories.</h2>
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-none text-brand-blue">Shape brands.</h2>
          <h2 className="text-4xl md:text-7xl font-display font-bold leading-none gradient-text">Create impact.</h2>
        </div>
      </section>

      {/* NEW SECTION: PHOTO GALLERY */}
      <PhotoGallery />

      {/* SECTION 8: FINAL */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center" id="final">
        <h2 className="text-3xl md:text-5xl font-display mb-12 text-zinc-300">And I’m just getting started.</h2>
        <motion.a
          href="https://www.instagram.com/ig_corbeen_?igsh=MW80d2dxYWpjZnN4ZA%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-5 bg-white text-black font-display font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            Work With Me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.a>
      </section>

      <footer className="py-12 px-6 text-center text-zinc-700 text-[10px] uppercase tracking-widest">
        &copy; 2024 CORBEEN PORTFOLIO / CINEMATIC EXP.
      </footer>
    </div>
  );
}
