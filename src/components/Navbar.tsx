import { useState, useEffect } from 'react';
import { Menu, X, Search, ChevronDown, Scissors, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  {
    label: '服装打版',
    href: '#courses',
    submenu: [
      { label: '新手入门', href: '#courses' },
      { label: '进阶技巧', href: '#courses' },
      { label: '打版工具', href: '#courses' },
      { label: '案例实操', href: '#courses' },
    ],
  },
  {
    label: '服装工艺',
    href: '#courses',
    submenu: [
      { label: '基础工艺', href: '#courses' },
      { label: '进阶工艺', href: '#courses' },
      { label: '工艺工具', href: '#courses' },
      { label: '常见问题', href: '#faq' },
    ],
  },
  {
    label: '服装搭配',
    href: '#courses',
    submenu: [
      { label: '风格搭配', href: '#courses' },
      { label: '场景搭配', href: '#courses' },
      { label: '品类搭配', href: '#courses' },
      { label: '搭配技巧', href: '#courses' },
    ],
  },
  { label: '互动交流', href: '#community' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 fabric-out ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-tan flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-charcoal">
              裁缝技艺
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-charcoal hover:text-tan transition-colors duration-300"
            >
              首页
            </a>
            {navLinks.map((link) =>
              link.submenu ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-charcoal hover:text-tan transition-colors duration-300">
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-cream border-peach"
                  >
                    {link.submenu.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <a
                          href={item.href}
                          className="text-charcoal hover:text-tan hover:bg-peach/30 cursor-pointer"
                        >
                          {item.label}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-charcoal hover:text-tan transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 text-charcoal hover:text-tan transition-colors duration-300">
              <Search className="w-5 h-5" />
            </button>
            <Button
              variant="outline"
              className="border-tan text-charcoal hover:bg-tan hover:text-white transition-all duration-300"
            >
              <User className="w-4 h-4 mr-2" />
              个人中心
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md shadow-elevated transition-all duration-500 fabric-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-2">
          <a
            href="#"
            className="block px-4 py-3 text-base font-medium text-charcoal hover:text-tan hover:bg-peach/20 rounded-lg transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            首页
          </a>
          {navLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-charcoal hover:text-tan hover:bg-peach/20 rounded-lg transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
              {link.submenu && (
                <div className="pl-4 space-y-1">
                  {link.submenu.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray hover:text-tan transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-peach">
            <Button
              className="w-full bg-tan text-white hover:bg-tan/90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-4 h-4 mr-2" />
              个人中心
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
