import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NavBar from './NavBar';
import Hero from './Hero';
import Footer from './Footer';
import ManifestoOverlay from './ManifestoOverlay';

function App() {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoPromise = new Promise<void>((resolve) => {
      video.oncanplaythrough = () => resolve();
    });

    const fontPromise = document.fonts.ready;

    Promise.all([videoPromise, fontPromise]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={`App ${isLoading ? 'loading' : 'loaded'}`}>
      <NavBar onManifestoClick={() => setManifestoOpen(true)} />
      <Hero />
      <video
        ref={videoRef}
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
