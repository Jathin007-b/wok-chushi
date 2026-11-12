import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Offers from './components/Offers.jsx';
import Gallery from './components/Gallery.jsx';
import Faq from './components/Faq.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <Services />
        <Offers />
        <Gallery />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
