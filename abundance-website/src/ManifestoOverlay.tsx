import React, { useEffect, useState, useRef } from 'react';
import './ManifestoOverlay.css';

interface ManifestoOverlayProps {
  open: boolean;
  onClose?: () => void;
}

const title = 'Manifesto:';
const manifesto = `We believe that true prosperity—of families, communities, and nations—springs from the seeds of education we sow today. Our mission is to cultivate every child’s potential, equipping them to flourish in the real world with knowledge, confidence, and purpose.`;

const TYPE_SPEED = 45; // ms per character (slower)

const ManifestoOverlay: React.FC<ManifestoOverlayProps> = ({ open, onClose }) => {
  const [animIndex, setAnimIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const timeouts = useRef<number[]>([]);
  const fullText = title + '\n' + manifesto;

  useEffect(() => {
    if (open) {
      setAnimIndex(0);
      setShowText(false);
      const animate = () => {
        setAnimIndex((prev) => {
          if (prev < fullText.length) {
            timeouts.current.push(window.setTimeout(animate, TYPE_SPEED));
            return prev + 1;
          } else {
            setShowText(true);
            return prev;
          }
        });
      };
      animate();
    }
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
    // eslint-disable-next-line
  }, [open]);

  if (!open) return null;

  // Split title and manifesto for styling
  const current = fullText.slice(0, animIndex);
  const [currentTitle, ...currentTextArr] = current.split('\n');
  const currentText = currentTextArr.join('\n');

  return (
    <div className="manifesto-overlay" onClick={onClose}>
      <div className="manifesto-content" onClick={e => e.stopPropagation()}>
        <div className="manifesto-title">
          {currentTitle}
          {!showText && <span className="typewriter-cursor">|</span>}
        </div>
        <div className="manifesto-text">
          {currentText}
        </div>
      </div>
    </div>
  );
};

export default ManifestoOverlay; 