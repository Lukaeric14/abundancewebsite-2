import React, { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import Hero from './Hero';
import Footer from './Footer';
import ManifestoOverlay from './ManifestoOverlay';

function App() {
  const [manifestoOpen, setManifestoOpen] = useState(false);

  return (
    <div className="App">
      <NavBar onManifestoClick={() => setManifestoOpen(true)} />
      <Hero />
      <video
        className="App-bg-video"
        src={process.env.PUBLIC_URL + '/Move-In-Precise-Speed.mp4'}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Background video of precise movement"
      />
      <ManifestoOverlay open={manifestoOpen} onClose={() => setManifestoOpen(false)} />
      <Footer />
    </div>
  );
}

export default App;
