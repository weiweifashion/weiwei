import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: '课程适合完全没有基础的初学者吗？',
    answer:
      '当然适合！我们的课程专门设计了从零开始的入门路径，从最基础的测量、画线开始教起。每个步骤都有详细的视频演示和文字说明，确保你能够跟上进度。许多学员都是零基础开始，现在已经能够独立完成服装制作了。',
  },
  {
    id: 2,
    question: '学习过程中需要自备哪些材料和工具？',
    answer:
      '入门阶段你需要准备基础的缝纫工具：缝纫机（家用款即可）、剪刀、尺子、划粉、珠针等。我们会在课程中详细列出每节课所需的材料清单，并提供购买建议。对于打版课程，你需要准备打版纸和绘图工具。',
  },
  {
    id: 3,
    question: '课程视频可以永久观看吗？',
    answer:
      '是的，所有课程视频一经购买即可永久观看，没有时间限制。你可以根据自己的进度反复学习，随时回顾重点内容。我们还提供课程资料的下载服务，方便你离线学习。',
  },
  {
    id: 4,
    question: '如何获得老师的指导和作业点评？',
    answer:
      '我们提供多种互动方式：1）课程评论区可以随时提问；2）专属学习群组与老师同学交流；3）定期直播答疑课；4）提交作业获得一对一点评。进阶课程还提供私教辅导服务。',
  },
  {
    id: 5,
    question: '完成课程后能获得证书吗？',
    answer:
      '是的，完成指定课程的学习并通过考核后，你将获得我们颁发的专业认证证书。该证书在服装行业内具有一定认可度，可以作为你技能的证明。部分高级课程还提供行业资格认证。',
  },
  {
    id: 6,
    question: '如果不满意可以退款吗？',
    answer:
      '我们提供7天无理由退款保障。在购买课程后7天内，如果你对学习内容不满意，可以申请全额退款，无需任何理由。我们希望通过这种方式让你能够放心尝试。',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 lg:py-32 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
              常见问题
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal mb-6">
              你可能想<span className="text-tan">了解的</span>
            </h2>
            <p className="text-lg text-gray">
              如果没有找到你想要的答案，欢迎随时联系我们
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="bg-cream rounded-xl overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-peach/20 transition-colors duration-300"
                >
                  <span className="font-display text-lg font-medium text-charcoal pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openId === faq.id
                        ? 'bg-tan text-white rotate-180'
                        : 'bg-peach/50 text-tan'
                    }`}
                  >
                    {openId === faq.id ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 fabric-out ${
                    openId === faq.id ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-peach/50">
                      <p className="text-gray leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-peach/30 rounded-2xl">
            <p className="text-charcoal font-medium mb-2">还有其他问题？</p>
            <p className="text-gray text-sm mb-4">
              我们的客服团队随时为你解答
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-tan hover:text-charcoal transition-colors duration-300 font-medium"
            >
              联系我们
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
