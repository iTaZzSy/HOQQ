import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Events from '../components/Events';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Reservations from '../components/Reservations';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-x-hidden text-stone-300 antialiased selection:bg-amber-500 selection:text-zinc-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <Events />
        <Gallery />
        <Testimonials />
        <Reservations />
      </main>
      <Footer />
    </div>
  );
};

export default Home;