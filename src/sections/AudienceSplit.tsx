import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    id: 'beginner',
    title: '新手入门通道',
    subtitle: '零基础起步',
    description: '从未接触过服装制作？不用担心！我们为你准备了完整的入门教程，从认识工具到完成第一件作品。',
    icon: Sparkles,
    features: ['基础工具科普', '简单版型实操', '步骤图文拆解', '新手避坑指南'],
    color: 'from-peach to-peach/50',
    href: '#courses',
  },
  {
    id: 'professional',
    title: '从业者进阶通道',
    subtitle: '技能提升',
    description: '已有基础，想要精进技艺？我们的进阶课程将帮助你掌握更专业的技术，提升职业竞争力。',
    icon: Briefcase,
    features: ['复杂版型设计', '工艺优化技巧', '行业标准流程', '专业工具应用'],
    color: 'from-tan/30 to-tan/10',
    href: '#courses',
  },
];

export default function AudienceSplit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
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
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
            选择你的路径
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-6">
            找到适合你的<span className="text-tan">学习方向</span>
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            无论你是零基础的新手，还是希望提升的从业者，我们都有为你量身定制的学习方案
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <div
              key={audience.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative"
            >
              <div
                className={`relative h-full bg-gradient-to-br ${audience.color} rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:shadow-elevated hover:-translate-y-2`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <pattern
                      id={`pattern-${audience.id}`}
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="10" cy="10" r="1" fill="#535353" />
                    </pattern>
                    <rect
                      width="100"
                      height="100"
                      fill={`url(#pattern-${audience.id})`}
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <audience.icon className="w-7 h-7 text-tan" />
                  </div>

                  {/* Title */}
                  <p className="text-xs uppercase tracking-wider text-tan mb-2">
                    {audience.subtitle}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-gray mb-6 leading-relaxed">
                    {audience.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {audience.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-charcoal"
                      >
                        <span className="w-1.5 h-1.5 bg-tan rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    className="bg-charcoal text-white hover:bg-charcoal/90 rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 group/btn"
                  >
                    <a href={audience.href}>
                      进入通道
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
