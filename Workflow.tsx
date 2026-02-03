import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, GraduationCap, Users, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    title: '选择课程',
    description: '浏览我们的课程目录，根据你的基础和目标选择适合的课程',
    icon: BookOpen,
  },
  {
    id: 2,
    title: '学习技艺',
    description: '跟随视频教程学习，完成作业并获得导师的专业点评',
    icon: GraduationCap,
  },
  {
    id: 3,
    title: '加入社区',
    description: '与其他学员交流心得，分享作品，共同进步成长',
    icon: Users,
  },
  {
    id: 4,
    title: '获得认证',
    description: '完成课程学习，通过考核获得专业认证证书',
    icon: BadgeCheck,
  },
];

export default function Workflow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Path drawing animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(
            step,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
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
      id="workflow"
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
            学习流程
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
            我们的<span className="text-tan">工作流程</span>
          </h2>
        </div>

        {/* Workflow Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG Path - Desktop */}
          <svg
            className="absolute inset-0 w-full h-full hidden lg:block"
            viewBox="0 0 1000 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 100 100 Q 250 100 300 200 Q 350 300 500 300 Q 650 300 700 200 Q 750 100 900 100"
              fill="none"
              stroke="#d9b79a"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => { stepsRef.current[index] = el; }}
                className={`relative ${
                  index % 2 === 1 ? 'lg:mt-16' : ''
                }`}
              >
                {/* Card */}
                <div className="relative bg-cream rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-2 w-10 h-10 bg-tan rounded-full flex items-center justify-center text-white font-display font-semibold text-lg shadow-soft group-hover:scale-110 transition-transform duration-300">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-peach/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-tan/20 transition-colors duration-300">
                    <step.icon className="w-7 h-7 text-tan" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-px h-8 bg-tan/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray mb-2">准备好开始你的服装学习之旅了吗？</p>
          <p className="font-display text-xl text-charcoal">
            立即加入，<span className="text-tan">开启你的创作之路</span>
          </p>
        </div>
      </div>
    </section>
  );
}
