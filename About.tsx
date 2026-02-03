import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pattern rotation animation
      gsap.fromTo(
        patternRef.current,
        { opacity: 0, rotation: -15 },
        {
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Continuous rotation on scroll
      gsap.to(patternRef.current, {
        rotation: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="relative z-10">
            <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
              关于我们
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight mb-6">
              学习、创造与创新的
              <span className="text-tan">中心</span>
            </h2>
            <p className="text-lg text-gray mb-6 leading-relaxed">
              加入一个充满热情的裁缝师社区，在这里精准与创意相遇。我们致力于为每一位学员提供专业、系统的服装技能培训。
            </p>
            <p className="text-gray mb-8 leading-relaxed">
              无论你是零基础的新手，还是希望精进技艺的从业者，我们都有适合你的课程。从打版到工艺，从理论到实践，让每一步学习都充满成就感。
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: '专业师资', desc: '行业资深导师亲授' },
                { title: '系统课程', desc: '从入门到精通' },
                { title: '实操为主', desc: '理论与实践结合' },
                { title: '终身学习', desc: '一次报名永久回看' },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-4 bg-peach/30 rounded-xl hover:bg-peach/50 transition-colors duration-300"
                >
                  <h4 className="font-display text-lg font-semibold text-charcoal mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Pattern */}
          <div className="relative flex items-center justify-center">
            {/* Decorative Pattern */}
            <div
              ref={patternRef}
              className="relative w-80 h-80 lg:w-96 lg:h-96 will-change-transform"
            >
              <svg
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Outer circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="190"
                  stroke="#d9b79a"
                  strokeWidth="1"
                  strokeDasharray="8 8"
                  fill="none"
                />
                {/* Middle circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  stroke="#d9b79a"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Inner circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="110"
                  stroke="#d9b79a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  fill="none"
                />
                {/* Center */}
                <circle cx="200" cy="200" r="20" fill="#f2e3d5" />
                {/* Spokes */}
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="200"
                    y1="200"
                    x2={200 + 180 * Math.cos((i * 30 * Math.PI) / 180)}
                    y2={200 + 180 * Math.sin((i * 30 * Math.PI) / 180)}
                    stroke="#d9b79a"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Decorative dots */}
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={`dot-${i}`}
                    cx={200 + 130 * Math.cos((i * 45 * Math.PI) / 180)}
                    cy={200 + 130 * Math.sin((i * 45 * Math.PI) / 180)}
                    r="6"
                    fill="#d9b79a"
                  />
                ))}
              </svg>

              {/* Center Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-tan rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 w-[500px] h-[500px] bg-peach/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Vertical stitch line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block">
        <svg className="h-full w-4" viewBox="0 0 4 100" preserveAspectRatio="none">
          <path
            d="M 2 0 L 2 100"
            fill="none"
            stroke="#d9b79a"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </section>
  );
}
