import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#hero', text: 'Anasayfa' },
    { href: '#about', text: 'Hakkımızda' },
    { href: '#menu', text: 'Menü' },
    { href: '#events', text: 'Etkinlikler' },
    { href: '#gallery', text: 'Galeri' },
    { href: '#testimonials', text: 'Yorumlar' },
    { href: '#reservations', text: 'Rezervasyon' },
    { href: '#footer', text: 'İletişim' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1a19]/80 backdrop-blur-sm border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="text-3xl font-bold tracking-wider text-amber-500">HOQQA</a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg text-stone-200 hover:text-amber-500 transition-colors duration-200"
              >
                {link.text}
              </a>
            ))}
          </nav>
          <button 
            className="md:hidden text-white text-2xl z-50" 
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#1c1a19]/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl text-stone-200 hover:text-amber-500 transition-colors duration-200"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;