import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Bookmark, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const tutorials = [
  {
    id: 1,
    title: '基础T恤打版教程',
    category: '服装打版',
    level: '新手',
    duration: '45分钟',
    image: '/images/course-pattern.jpg',
    type: 'video',
  },
  {
    id: 2,
    title: '直线缝纫技巧详解',
    category: '服装工艺',
    level: '新手',
    duration: '30分钟',
    image: '/images/course-sewing.jpg',
    type: 'video',
  },
  {
    id: 3,
    title: '春夏通勤搭配指南',
    category: '服装搭配',
    level: '进阶',
    duration: '20分钟',
    image: '/images/course-styling.jpg',
    type: 'article',
  },
  {
    id: 4,
    title: '西装外套版型优化',
    category: '服装打版',
    level: '进阶',
    duration: '60分钟',
    image: '/images/hero-left.jpg',
    type: 'video',
  },
  {
    id: 5,
    title: '锁边工艺完整教程',
    category: '服装工艺',
    level: '新手',
    duration: '25分钟',
    image: '/images/hero-center.jpg',
    type: 'video',
  },
];

const categories = ['全部', '服装打版', '服装工艺', '服装搭配'];

export default function PopularTutorials() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [scrollPosition, setScrollPosition] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredTutorials =
    activeCategory === '全部'
      ? tutorials
      : tutorials.filter((t) => t.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newPosition =
        direction === 'left'
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="popular"
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
              热门推荐
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
              精选<span className="text-tan">教程</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-tan text-white'
                    : 'bg-peach/30 text-charcoal hover:bg-peach/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Cards - Horizontal Scroll */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-elevated flex items-center justify-center hover:bg-tan hover:text-white transition-colors duration-300 hidden lg:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-elevated flex items-center justify-center hover:bg-tan hover:text-white transition-colors duration-300 hidden lg:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredTutorials.map((tutorial, index) => (
              <div
                key={tutorial.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="flex-shrink-0 w-72 snap-start"
              >
                <div className="group bg-cream rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={tutorial.image}
                      alt={tutorial.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-charcoal text-xs"
                      >
                        {tutorial.type === 'video' ? (
                          <Play className="w-3 h-3 mr-1" />
                        ) : (
                          <Bookmark className="w-3 h-3 mr-1" />
                        )}
                        {tutorial.type === 'video' ? '视频' : '图文'}
                      </Badge>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`text-xs ${
                          tutorial.level === '新手'
                            ? 'bg-green-500/90'
                            : 'bg-tan/90'
                        }`}
                      >
                        {tutorial.level}
                      </Badge>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-tan mb-1">{tutorial.category}</p>
                    <h3 className="font-display text-lg font-semibold text-charcoal line-clamp-2 group-hover:text-tan transition-colors duration-300">
                      {tutorial.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-tan text-charcoal hover:bg-tan hover:text-white rounded-full px-8"
          >
            查看全部教程
          </Button>
        </div>
      </div>
    </section>
  );
}
