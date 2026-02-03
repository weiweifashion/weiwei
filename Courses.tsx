import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 1,
    title: '服装打版',
    subtitle: 'Pattern Making',
    description: '从基础测量到复杂版型，系统学习服装打版的核心技艺',
    image: '/images/course-pattern.jpg',
    duration: '32课时',
    students: '2,580',
    rating: 4.9,
    level: '零基础友好',
    color: 'from-tan/20 to-tan/5',
  },
  {
    id: 2,
    title: '服装工艺',
    subtitle: 'Sewing Techniques',
    description: '掌握专业缝纫技术，从基础针法到高级工艺全覆盖',
    image: '/images/course-sewing.jpg',
    duration: '48课时',
    students: '3,120',
    rating: 4.8,
    level: '循序渐进',
    color: 'from-peach to-peach/30',
  },
  {
    id: 3,
    title: '服装搭配',
    subtitle: 'Styling & Coordination',
    description: '学习色彩搭配、风格定位，打造个人专属穿搭美学',
    image: '/images/course-styling.jpg',
    duration: '24课时',
    students: '1,890',
    rating: 4.9,
    level: '实用导向',
    color: 'from-tan/30 to-tan/10',
  },
];

export default function Courses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Parallax effect for middle column
      const middleCard = cardsRef.current[1];
      if (middleCard) {
        gsap.to(middleCard, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative py-24 lg:py-32 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
            我们的课程
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-6">
            适合各层次的<span className="text-tan">学习课程</span>
          </h2>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            精心设计的课程体系，无论你是初学者还是进阶学习者，都能找到适合自己的学习路径
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group relative ${index === 1 ? 'lg:mt-10' : ''}`}
            >
              <div className="relative bg-cream rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${course.color} opacity-60`}
                  />
                  {/* Level Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-charcoal rounded-full">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-tan mb-2">
                    {course.subtitle}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">
                    {course.title}
                  </h3>
                  <p className="text-gray text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-tan" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-tan" />
                      <span>{course.students}人</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-tan fill-tan" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-charcoal hover:text-tan hover:bg-peach/30 group/btn"
                  >
                    <span>了解更多</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-tan text-white hover:bg-tan/90 rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-elevated"
          >
            查看全部课程
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
