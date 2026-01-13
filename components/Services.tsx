import React from 'react';

const ServiceCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-[#2a2726]/50 p-6 rounded-md text-center border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 h-full flex flex-col items-center justify-center">
    <div className="text-amber-500 text-4xl mb-4">
      <i className={`fas ${icon}`}></i>
    </div>
    <h3 className="text-xl font-bold mb-2 text-stone-200">{title}</h3>
    <p className="text-stone-400">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: 'fa-smoking',
      title: 'Özel Nargileler',
      description: 'Özenle tasarlanmış nargilelerde en kaliteli tütün ve dünya lezzetlerinden oluşan geniş bir seçki sunuyoruz.',
    },
    {
      icon: 'fa-gamepad',
      title: 'Video Oyunları',
      description: 'Oyunculara özel alanımızda en yeni PlayStation konsolları ve en popüler video oyunlarının keyfini çıkarın.',
    },
    {
      icon: 'fa-mug-hot',
      title: 'Yiyecek & İçecekler',
      description: 'Deneyiminizi tamamlamak için çeşitli sıcak ve soğuk içecekler ile hafif atıştırmalıklardan oluşan bir menü.',
    },
    {
      icon: 'fa-users',
      title: 'Şık Oturma Alanları',
      description: 'Arkadaşlarınızla buluşmak ve sakin ve şık bir ortamda zamanınızın tadını çıkarmak için ideal atmosfer ve konforlu oturma alanları.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#161413]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-200">Hizmetlerimiz</h2>
          <p className="text-stone-400 mt-2">Deneyiminizi unutulmaz kılmak için sunduklarımız</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;