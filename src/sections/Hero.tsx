import { useEffect, useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const stitchRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([titleRef.current, subtitleRef.current, descRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(buttonsRef.current, { opacity: 0, scale: 0.9 });
      gsap.set([leftImageRef.current, centerImageRef.current, rightImageRef.current], {
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)',
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          buttonsRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
        .to(
          [leftImageRef.current, centerImageRef.current, rightImageRef.current],
          {
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.8'
        );

      // Stitch line animation
      if (stitchRef.current) {
        const length = stitchRef.current.getTotalLength();
        gsap.set(stitchRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(
          stitchRef.current,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'none',
          },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (leftImageRef.current && rightImageRef.current && centerImageRef.current) {
        leftImageRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        rightImageRef.current.style.transform = `translateY(${scrollY * -0.1}px)`;
        centerImageRef.current.style.transform = `scale(${1 + scrollY * 0.0002})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#d9b79a"
              strokeWidth="0.3"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Stitch Line */}
      <svg
        className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
        viewBox="0 0 4 100"
        preserveAspectRatio="none"
      >
        <path
          ref={stitchRef}
          d="M 2 0 L 2 100"
          fill="none"
          stroke="#d9b79a"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />
      </svg>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="relative z-10 text-center lg:text-left">
            <p
              ref={subtitleRef}
              className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4"
            >
              学习服装制作
            </p>
            <h1
              ref={titleRef}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-charcoal leading-tight mb-6"
            >
              从基础到精致的
              <span className="block text-tan">服装制作技艺</span>
            </h1>
            <p
              ref={descRef}
              className="text-lg text-gray max-w-xl mx-auto lg:mx-0 mb-8"
            >
              通过我们的综合课程，学习服装制作和缝纫的精髓。从零基础到专业水准，让每一笔剪裁都成为艺术。
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-tan text-white hover:bg-tan/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-elevated hover:scale-105"
              >
                开始缝纫之旅
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-full px-8 py-6 text-base font-medium transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                观看介绍
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { value: '50+', label: '专业课程' },
                { value: '10k+', label: '学员信赖' },
                { value: '98%', label: '好评率' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="font-display text-2xl lg:text-3xl font-semibold text-tan">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images */}
          <div className="relative h-[500px] lg:h-[600px] hidden md:block">
            {/* Left Image */}
            <div
              ref={leftImageRef}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] h-[70%] rounded-2xl overflow-hidden shadow-elevated will-change-transform"
            >
              <img
                src="/images/hero-left.jpg"
                alt="服装模特"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center Image */}
            <div
              ref={centerImageRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[80%] rounded-2xl overflow-hidden shadow-elevated z-10 will-change-transform"
            >
              <img
                src="/images/hero-center.jpg"
                alt="缝纫工具"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Image */}
            <div
              ref={rightImageRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-y-8 w-[45%] h-[70%] rounded-2xl overflow-hidden shadow-elevated will-change-transform"
            >
              <img
                src="/images/hero-right.jpg"
                alt="服装展示"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 left-1/4 w-24 h-24 bg-peach rounded-full opacity-60 blur-2xl" />
            <div className="absolute -top-4 right-1/4 w-32 h-32 bg-tan/30 rounded-full opacity-60 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#fbf5f1"
          />
        </svg>
      </div>
    </section>
  );
}
