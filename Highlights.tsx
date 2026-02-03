import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Video, Users, Gift } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    id: 1,
    title: '零基础友好',
    description: '步骤详细拆解，新手也能轻松上手',
    icon: BookOpen,
  },
  {
    id: 2,
    title: '专业干货',
    description: '从业者审核内容，确保知识准确',
    icon: Video,
  },
  {
    id: 3,
    title: '实操导向',
    description: '图文+视频结合，边看边做',
    icon: Users,
  },
  {
    id: 4,
    title: '免费入门',
    description: '基础教程免费开放，零门槛体验',
    icon: Gift,
  },
];

export default function Highlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 w-full bg-peach/30"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.id}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cream rounded-2xl shadow-soft mb-4 group-hover:bg-tan group-hover:shadow-elevated transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <highlight.icon className="w-8 h-8 text-tan group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal mb-2">
                {highlight.title}
              </h3>
              <p className="text-sm text-gray">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
