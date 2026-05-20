import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#161413] border-t border-stone-800/50">
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-200">İletişim</h2>
            <p className="text-stone-400 mt-2 max-w-xl mx-auto">
                Sorularınız, rezervasyonlarınız veya özel etkinlikleriniz için bize ulaşın. Sizi ağırlamaktan mutluluk duyarız.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8 text-center md:text-left">
          
          {/* Column 1: About */}
          <div className="space-y-4">
            <a href="#hero" className="inline-block text-3xl font-bold tracking-wider text-amber-500">HOQQA</a>
            <p className="text-stone-400 text-sm">
              Lüks nargile sanatını, elektronik oyunların heyecanını ve seçkin sosyal atmosferi bir araya getiren eşsiz bir mekan.
            </p>
          </div>
          
          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-stone-200 mb-4 uppercase tracking-wider">İletişim Bilgileri</h3>
            <div className="text-stone-400 space-y-3">
              <p className="flex items-center justify-center md:justify-start">
                <i className="fas fa-map-marker-alt w-6 text-amber-500"></i>
                <span>123 Lüks Caddesi, İstanbul</span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <i className="fas fa-phone w-6 text-amber-500"></i>
                <span>+90 555 123 45 67</span>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <i className="fas fa-clock w-6 text-amber-500"></i>
                <span>Her gün 16:00 - 02:00</span>
              </p>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div>
             <h3 className="text-lg font-bold text-stone-200 mb-4 uppercase tracking-wider">Bizi Takip Edin</h3>
             <div className="flex space-x-4 text-2xl justify-center md:justify-start">
                <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Snapchat" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-snapchat"></i></a>
                <a href="#" aria-label="Tiktok" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-tiktok"></i></a>
                <a href="#" aria-label="Whatsapp" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-whatsapp"></i></a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-stone-800/50 pt-6 mt-8 text-center text-stone-500 text-sm">
          <p>&copy; {currentYear} HOQQA Lounge. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;