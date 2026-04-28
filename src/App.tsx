import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Scene from './components/Experience/Scene.tsx';
import Overlay from './components/Overlay/Content.tsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 2. GSAP Animations
    const ctx = gsap.context(() => {
      // Timeline Scrub Section
      const timelineItems = gsap.utils.toArray('.timeline-item');
      timelineItems.forEach((item, i) => {
        gsap.to(item as HTMLElement, {
          opacity: 1,
          y: -50,
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top bottom-=20%',
            end: 'top top+=20%',
            scrub: true,
            // markers: true
          }
        });
      });

      // Obsession Section Glitch Effect
      gsap.to('.obsession-content', {
        scale: 1.2,
        opacity: 0,
        scrollTrigger: {
          trigger: '#obsession',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        }
      });

      // Philosophy Text Stagger
      gsap.from('.philosophy-text h2', {
        x: -100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '#philosophy',
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0b0b0b] min-h-screen">
      {/* 3D Background */}
      <Scene />
      
      {/* Overlay UI */}
      <Overlay />

      {/* Global Grain/Vignette Effect Layer */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-neutral-950 opacity-[0.03] grayscale contrast-150 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-radial-vignette {
          background: radial-gradient(circle at center, transparent 0%, black 100%);
        }
      `}} />
    </div>
  );
}

