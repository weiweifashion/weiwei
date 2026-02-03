import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('感谢您的留言！我们会尽快与您联系。');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-tan font-medium mb-4">
            联系我们
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
            与我们<span className="text-tan">取得联系</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-cream rounded-2xl p-8 shadow-soft"
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  姓名
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="请输入您的姓名"
                    className="w-full px-4 py-3 bg-white border-2 border-peach/50 rounded-xl focus:border-tan focus:ring-0 transition-colors duration-300"
                    required
                  />
                  <div
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-tan transition-all duration-300 ${
                      focusedField === 'name' ? 'w-full -translate-x-1/2' : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  邮箱
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="请输入您的邮箱"
                    className="w-full px-4 py-3 bg-white border-2 border-peach/50 rounded-xl focus:border-tan focus:ring-0 transition-colors duration-300"
                    required
                  />
                  <div
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-tan transition-all duration-300 ${
                      focusedField === 'email'
                        ? 'w-full -translate-x-1/2'
                        : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  留言
                </label>
                <div className="relative">
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="请输入您想咨询的内容"
                    rows={5}
                    className="w-full px-4 py-3 bg-white border-2 border-peach/50 rounded-xl focus:border-tan focus:ring-0 transition-colors duration-300 resize-none"
                    required
                  />
                  <div
                    className={`absolute bottom-0 left-1/2 h-0.5 bg-tan transition-all duration-300 ${
                      focusedField === 'message'
                        ? 'w-full -translate-x-1/2'
                        : 'w-0'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-tan text-white hover:bg-tan/90 rounded-xl py-6 text-base font-medium transition-all duration-300 hover:shadow-elevated group"
              >
                发送留言
                <Send className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-4">
                联系方式
              </h3>
              <p className="text-gray leading-relaxed">
                无论你是对课程有疑问，还是想咨询合作事宜，都欢迎通过以下方式与我们联系。我们会在24小时内回复你的消息。
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: '电子邮箱',
                  content: 'hello@tailorcraft.com',
                  href: 'mailto:hello@tailorcraft.com',
                },
                {
                  icon: Phone,
                  title: '联系电话',
                  content: '+86 400-888-8888',
                  href: 'tel:+864008888888',
                },
                {
                  icon: MapPin,
                  title: '工作室地址',
                  content: '上海市静安区南京西路1266号',
                  href: '#',
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-start gap-4 p-4 bg-peach/20 rounded-xl hover:bg-peach/40 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-tan rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray mb-1">{item.title}</p>
                    <p className="font-medium text-charcoal">{item.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Working Hours */}
            <div className="p-6 bg-cream rounded-xl shadow-soft">
              <h4 className="font-display text-lg font-semibold text-charcoal mb-4">
                工作时间
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray">周一至周五</span>
                  <span className="text-charcoal">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">周六</span>
                  <span className="text-charcoal">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">周日</span>
                  <span className="text-charcoal">休息</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
