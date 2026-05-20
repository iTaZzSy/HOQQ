import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-[#161413]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-3 text-stone-200">Bizi Ziyaret Edin veya İletişime Geçin</h2>
        <p className="text-stone-400 max-w-xl mx-auto mb-10">
          Size olağanüstü bir deneyim sunmak için bekliyoruz.
        </p>

        <div className="mb-10">
            <h3 className="text-amber-500 text-lg font-bold">Adres</h3>
            <p className="text-stone-300">123 Lüks Caddesi, İstanbul, Türkiye</p>
            <h3 className="text-amber-500 text-lg font-bold mt-4">Çalışma Saatleri</h3>
            <p className="text-stone-300">Her gün 16:00 - 02:00</p>
        </div>

        <div className="flex justify-center space-x-6 text-2xl">
          <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-instagram"></i></a>
          <a href="#" aria-label="Snapchat" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-snapchat"></i></a>
          <a href="#" aria-label="Tiktok" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-tiktok"></i></a>
          <a href="#" aria-label="Whatsapp" className="text-stone-400 hover:text-amber-500 transition-colors duration-300"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;