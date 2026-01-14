import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4 text-amber-500">HOQQA HAKKINDA</h2>
            <p className="text-stone-400 leading-relaxed mb-4">
              Lüks nargile sanatını, elektronik oyunların heyecanını ve seçkin sosyal atmosferi bir araya getiren eşsiz bir mekan.
            </p>
            <p className="text-stone-400 leading-relaxed">
              Her köşe, size konfor ve lüks sunmak için tasarlanmıştır. Profesyonel ekibimiz, her ziyaretinizi unutulmaz bir deneyim haline getirmek için çalışmaktadır.
            </p>
          </div>
          <div className="rounded-md overflow-hidden border border-amber-500/20 p-1">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1947&auto=format&fit=crop" alt="HOQQA Lounge Interior" className="w-full h-full object-cover rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;