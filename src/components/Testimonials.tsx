import React, { useState, useEffect, useRef } from 'react';

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
    <div className="bg-[#2a2726]/50 p-6 rounded-md text-center border border-amber-500/20 h-full flex flex-col justify-center">
        <p className="text-stone-300 italic mb-4">"{quote}"</p>
        <p className="font-bold text-amber-500">- {author}</p>
    </div>
);

const Testimonials: React.FC = () => {
    const testimonials = [
        {
            quote: "İstanbul'da denediğim en iyi nargileydi. Mekanın atmosferi ve hizmet kalitesi gerçekten birinci sınıf. Kesinlikle tekrar geleceğim.",
            author: "Ahmet Y."
        },
        {
            quote: "Oyun alanı harika, konsollar en yenisi ve ortam çok rahat. Arkadaşlarla vakit geçirmek için mükemmel bir yer.",
            author: "Elif S."
        },
        {
            quote: "Personel çok ilgili ve profesyonel. Her isteğimizle anında ilgilendiler. Kendimizi çok özel hissettik, teşekkürler HOQQA!",
            author: "Murat K."
        },
        {
            quote: "Kokteyller ve atıştırmalıklar harikaydı. Farklı bir deneyim arayanlar için kesinlikle tavsiye ederim. Her şey çok kaliteliydi.",
            author: "Zeynep A."
        },
        {
            quote: "Mekan tasarımı çok şık ve modern. Hem oyun oynamak hem de nargile içmek için harika bir konsept.",
            author: "Selin C."
        },
        {
            quote: "Fiyatlar kaliteye göre oldukça makul. Verdiğiniz paranın karşılığını sonuna kadar alıyorsunuz.",
            author: "Emre T."
        },
        {
            quote: "Harika bir atmosferi var, müzikler de çok iyi seçilmiş. Nargile içerken zamanın nasıl geçtiğini anlamadım.",
            author: "Can D."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [intervalDuration, setIntervalDuration] = useState(10000);
    const intervalRef = useRef<number | null>(null);

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const updateScreenSize = () => {
        if (window.innerWidth >= 768) { // Tablet and Desktop
            setItemsPerPage(window.innerWidth >= 1024 ? 3 : 2);
            setIntervalDuration(10000);
        } else { // Mobile
            setItemsPerPage(1);
            setIntervalDuration(5000);
        }
    };

    const advanceSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalPages);
    };

    const startCarousel = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(advanceSlide, intervalDuration);
    };

    const pauseCarousel = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => {
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    useEffect(() => {
        setCurrentIndex(0); // Reset index when items per page changes
    }, [itemsPerPage]);
    
    useEffect(() => {
        startCarousel();
        return () => pauseCarousel();
    }, [currentIndex, totalPages, intervalDuration]);


    return (
        <section id="testimonials" className="py-20 bg-[#161413]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-200">Müşterilerimiz Ne Diyor?</h2>
                    <p className="text-stone-400 mt-2">Sizlerden gelen değerli yorumlar</p>
                </div>
                <div
                    className="overflow-hidden relative"
                >
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {Array.from({ length: totalPages }).map((_, pageIndex) => (
                            <div key={pageIndex} className="flex-none w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {testimonials.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((testimonial, itemIndex) => (
                                    <div key={itemIndex} className="px-4">
                                        <TestimonialCard {...testimonial} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                     <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex space-x-2">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-colors ${currentIndex === idx ? 'bg-amber-500' : 'bg-stone-600'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;