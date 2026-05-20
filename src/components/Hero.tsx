import React from 'react';

const Hero: React.FC = () => {
  const heroBgImage = "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1974&auto=format&fit=crop";
  const overlayColor = "rgba(28, 26, 25, 0.7)"; // This is the color from bg-[#1c1a19] with 70% opacity

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ 
        backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url('${heroBgImage}')` 
      }}
    >
      <div className="relative z-10 text-center text-white px-4">
        <h2 className="text-xl md:text-2xl font-light uppercase">HOŞ GELDİNİZ</h2>
        <h1 className="text-5xl md:text-7xl font-bold text-amber-500 my-3">
          HOQQA LOUNGE
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
          Eşsiz Bir Nargile ve Oyun Deneyimi
        </p>
        <a 
          href="#reservations" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#reservations')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="mt-8 inline-block bg-transparent border border-amber-500 text-amber-500 font-bold px-8 py-3 rounded-md uppercase tracking-wide hover:bg-amber-500 hover:text-zinc-900 transition-colors duration-300"
        >
          Rezervasyon Yap
        </a>
      </div>
    </section>
  );
};

export default Hero;