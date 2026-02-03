import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    // Refresh ScrollTrigger on load
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
        {/* Hero Section */}
        <Hero />

        {/* Highlights */}
        <Highlights />

        {/* Audience Split */}
        <AudienceSplit />

        {/* About Section */}
        <About />

        {/* Courses Section */}
        <Courses />

        {/* Popular Tutorials */}
        <PopularTutorials />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Workflow */}
        <Workflow />

        {/* FAQ */}
        <FAQ />

        {/* Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
import AirtableContent from './AirtableContent';

function App() {
  return (
    <div>
      <h1>我的网站</h1>
      <AirtableContent />
    </div>
  );
}
// 如果在 src/components/ 下
import AirtableContent from './components/AirtableContent';

// 如果直接在 src/ 下  
import AirtableContent from './AirtableContent';

function App() {
  return (
    <div>
      <AirtableContent />
    </div>
  );
}
