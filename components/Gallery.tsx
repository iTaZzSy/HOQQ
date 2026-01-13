import React, { useState, useEffect, useRef } from 'react';

const allImages = [
    { src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop', alt: 'Lounge Ambiance' },
    { src: 'https://images.unsplash.com/photo-1623255919364-5478056029ae?q=80&w=1964&auto=format&fit=crop', alt: 'Elegant Hookah' },
    { src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop', alt: 'Specialty Coffee' },
    { src: 'https://images.unsplash.com/photo-1551024709-8f237c20454d?q=80&w=1935&auto=format&fit=crop', alt: 'Crafted Drinks' },
    { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop', alt: 'Comfortable Seating' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop', alt: 'Gourmet Food' },
    { src: 'https://images.unsplash.com/photo-1578163905047-ac212d627038?q=80&w=1974&auto=format&fit=crop', alt: 'Stylish Lounge Area' },
    { src: 'https://images.unsplash.com/photo-1618466432327-ce555a6b57d9?q=80&w=1974&auto=format&fit=crop', alt: 'Friends playing video games'},
    { src: 'https://images.unsplash.com/photo-1586956434495-2391b1becd6c?q=80&w=1974&auto=format&fit=crop', alt: 'Detailed Hookah head with coals'},
    { src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop', alt: 'Bartender crafting a cocktail'},
    { src: 'https://images.unsplash.com/photo-1560421223-9533f801648a?q=80&w=1974&auto=format&fit=crop', alt: 'Cozy lounge corner at night'},
    { src: 'https://images.unsplash.com/photo-1599638671881-542121515f47?q=80&w=1974&auto=format&fit=crop', alt: 'A plate of delicious dessert'},
    { src: 'https://images.unsplash.com/photo-1627885793933-5c8f2a673b62?q=80&w=1974&auto=format&fit=crop', alt: 'Close-up of a game controller'},
];

const INITIAL_VISIBLE_COUNT = 6;

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(INITIAL_VISIBLE_COUNT);
  const galleryRef = useRef<HTMLElement>(null);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
  };
  
  const loadMoreImages = () => {
    setVisibleImages((prevCount) => prevCount + 3);
  };

  const showLessImages = () => {
    setVisibleImages(INITIAL_VISIBLE_COUNT);
    if (galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      }
      if (e.key === 'ArrowRight') {
        showNextImage();
      }
      if (e.key === 'ArrowLeft') {
        showPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, showNextImage, showPrevImage]);
  
  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [lightboxOpen]);


  return (
    <section id="gallery" className="py-20" ref={galleryRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-200">HOQQA'dan Kareler</h2>
          <p className="text-stone-400 mt-2">Atmosferimizi Görün</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allImages.slice(0, visibleImages).map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-md cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <i className="fas fa-search-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            {visibleImages < allImages.length ? (
                <button 
                  onClick={loadMoreImages}
                  className="bg-transparent border border-amber-500 text-amber-500 font-bold px-8 py-3 rounded-md uppercase tracking-wide hover:bg-amber-500 hover:text-zinc-900 transition-colors duration-300"
                >
                  Daha Fazla Göster
                </button>
            ) : allImages.length > INITIAL_VISIBLE_COUNT && (
                 <button 
                  onClick={showLessImages}
                  className="bg-transparent border border-amber-500 text-amber-500 font-bold px-8 py-3 rounded-md uppercase tracking-wide hover:bg-amber-500 hover:text-zinc-900 transition-colors duration-300"
                >
                  Daha Az Göster
                </button>
            )}
        </div>

        {lightboxOpen && (
          <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center animate-fadeIn" onClick={closeLightbox}>
            <button 
              className="absolute top-5 right-5 text-white/80 text-5xl hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
              onClick={closeLightbox}
            >
              &times;
            </button>
            
            <button 
              className="absolute left-5 text-white/80 text-5xl hover:text-white transition-colors z-10"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
            >
              &#8249;
            </button>

            <button 
              className="absolute right-5 text-white/80 text-5xl hover:text-white transition-colors z-10"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); showNextImage(); }}
            >
              &#8250;
            </button>

            <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <img 
                src={allImages[currentImageIndex].src} 
                alt={allImages[currentImageIndex].alt} 
                className="max-w-full max-h-[90vh] object-contain rounded-md" 
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;