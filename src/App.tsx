import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 原有组件导入
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Highlights from '@/sections/Highlights';
import AudienceSplit from '@/sections/AudienceSplit';
import About from '@/sections/About';
import Courses from '@/sections/Courses';
import PopularTutorials from '@/sections/PopularTutorials';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Workflow from '@/sections/Workflow';
import FAQ from '@/sections/FAQ';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

// 新增：Airtable 组件导入
import AirtableContent from './AirtableContent';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-cream">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Highlights />
        <AudienceSplit />
        <About />
        <Courses />
        <PopularTutorials />
        <WhyChooseUs />
        <Workflow />
        <FAQ />
        
        {/* 在这里插入 Airtable 内容组件（放在 Contact 前面或后面都可以）*/}
        <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
          <AirtableContent />
        </section>
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
