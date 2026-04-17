import React, { useState, useEffect } from 'react';

const EventCard: React.FC<{ image: string; title: string; date: string; description: string }> = ({ image, title, date, description }) => (
    <div className="group bg-[#2a2726]/50 rounded-lg overflow-hidden border border-stone-700 flex flex-col h-full transition-colors duration-300 hover:border-amber-500/40">
        <div className="overflow-hidden aspect-video">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" />
        </div>
        <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-base font-bold text-amber-500">{title}</h3>
            <p className="text-sm text-stone-400 mb-2">{date}</p>
            <p className="text-xs text-stone-400 flex-grow">{description}</p>
        </div>
    </div>
);

const Events: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
        };
        handleResize(); // Check on initial render
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const events = [
        {
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop',
            title: 'Haftalık FIFA Turnuvası',
            date: 'Her Cuma Saat 20:00',
            description: 'Arkadaşlarınla rekabet et ve haftanın şampiyonu olma şansını yakala. Kazananı özel ödüller bekliyor!',
        },
        {
            image: 'https://images.unsplash.com/photo-1606132034913-64906a683ec0?q=80&w=2070&auto=format&fit=crop',
            title: 'Ayın Nargilesi: "Tropik Esinti"',
            date: 'Tüm Ay Boyunca Geçerli',
            description: 'Bu aya özel, ananas, mango ve hindistan cevizi notalarıyla hazırlanan "Tropik Esinti" karışımımızı %20 indirimle deneyin.',
        },
        {
            image: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=2070&auto=format&fit=crop',
            title: 'Akustik Gece',
            date: 'Her Ayın Son Cumartesisi',
            description: 'Canlı akustik müzik performansları eşliğinde nargilenizin keyfini çıkarın. Sakin ve keyifli bir akşam için yerinizi ayırtın.',
        },
        {
            image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069&auto=format&fit=crop',
            title: 'Özel Kokteyl Haftası',
            date: 'Gelecek Hafta',
            description: 'Barmenimizin özel tarifleriyle hazırlanan yepyeni kokteyllerimizi keşfedin. Sadece bir haftalığına!',
        },
    ];

    // Duplicate events for a seamless loop
    const duplicatedEvents = [...events, ...events];

    const animationDuration = isMobile ? events.length * 10 : events.length * 18;

    return (
        <section id="events" className="py-20 bg-[#161413]">
            <style>
                {`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                .scrolling-wrapper:hover .scrolling-track {
                    animation-play-state: paused;
                }
                `}
            </style>
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-200">Etkinlikler & Promosyonlar</h2>
                    <p className="text-stone-400 mt-2">HOQQA'da her zaman özel bir şeyler olur</p>
                </div>
                <div 
                    className="scrolling-wrapper relative overflow-hidden"
                    style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                >
                    <div 
                        className="scrolling-track flex w-max"
                        style={{ 
                            animation: `scroll ${animationDuration}s linear infinite` 
                        }}
                    >
                        {duplicatedEvents.map((event, index) => (
                            <div key={index} className="flex-none w-[360px] px-4">
                                <EventCard {...event} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;