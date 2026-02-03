import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Clock, Users, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    title: '专家指导',
    subtitle: 'Expert Guidance',
    description:
      '我们的导师团队由资深服装设计师、打版师和工艺师组成，拥有丰富的行业经验和教学经验。他们将手把手教你掌握每一个技术细节，确保你能够真正学会、学精。',
    image: '/images/feature-expert.jpg',
    icon: Award,
    points: ['10年以上行业经验', '一对一作业点评', '定期直播答疑'],
  },
  {
    id: 2,
    title: '灵活学习',
    subtitle: 'Flexible Learning',
    description:
      '随时随地学习，按照自己的节奏进步。我们的课程支持多端观看，视频可反复回看，让你能够充分利用碎片时间，在工作学习之余提升技能。',
    image: '/images/feature-flexible.jpg',
    icon: Clock,
    points: ['支持手机/平板/电脑', '视频永久有效', '可下载学习资料'],
  },
  {
    id: 3,
    title: '社区支持',
    subtitle: 'Community Support',
    description:
      '加入我们的学习社群，与志同道合的学员一起交流进步。在这里你可以分享作品、提出问题、获得反馈，让学习之路不再孤单。',
    image: '/images/feature-community.jpg',
    icon: Users,
    points: ['专属学习群组', '作品展示平台', '定期线下活动'],
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stitchRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      featureRefs.current.forEach((feature, index) => {
        if (feature) {
          const image = feature.querySelector('.feature-image');
          const content = feature.querySelector('.feature-content');

          gsap.fromTo(
            image,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50, clipPath: 'inset(0 100% 0 0)' },
            {
              opacity: 1,
              x: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: feature,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            content,
            { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              delay: 0.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: feature,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Stitch line animation
      stitchRefs.current.forEach((stitch) => {
        if (stitch) {
          gsap.fromTo(
            stitch,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: stitch,
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
      id="why-us"
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
            我们的优势
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
            为什么选择<span className="text-tan">我们</span>？
          </h2>
        </div>

        {/* Features */}
        <div className="relative">
          {/* Center Stitch Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="relative h-full">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { stitchRefs.current[i] = el; }}
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-8 bg-tan rounded-full"
                  style={{ top: `${i * 25}%` }}
                />
              ))}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 4 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M 2 0 L 2 100"
                  fill="none"
                  stroke="#d9b79a"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
          </div>

          {/* Feature Items */}
          <div className="space-y-24 lg:space-y-32">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => { featureRefs.current[index] = el; }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`feature-image relative ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                  </div>
                  {/* Icon Badge */}
                  <div
                    className={`absolute -bottom-6 ${
                      index % 2 === 0 ? '-right-6' : '-left-6'
                    } w-16 h-16 bg-tan rounded-2xl flex items-center justify-center shadow-elevated`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`feature-content ${
                    index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''
                  }`}
                >
                  <p className="text-xs uppercase tracking-wider text-tan mb-2">
                    {feature.subtitle}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Points */}
                  <ul
                    className={`space-y-3 ${
                      index % 2 === 1 ? 'lg:ml-auto' : ''
                    }`}
                  >
                    {feature.points.map((point) => (
                      <li
                        key={point}
                        className={`flex items-center gap-3 ${
                          index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                        }`}
                      >
                        <CheckCircle className="w-5 h-5 text-tan flex-shrink-0" />
                        <span className="text-charcoal">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
