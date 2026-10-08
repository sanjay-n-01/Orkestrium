import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [isGo, setIsGo] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    const startAnimation = () => {
      setIsGo(true);
      timeout2 = setTimeout(() => {
        setIsComplete(true);
        document.body.style.overflow = '';
      }, 4100);
    };

    if (document.fonts) {
      Promise.race([
        document.fonts.load("100px 'Bebas Neue'"),
        new Promise(r => setTimeout(r, 1500))
      ]).then(startAnimation);
    } else {
      timeout1 = setTimeout(startAnimation, 500);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      document.body.style.overflow = '';
    };
  }, []);

  if (isComplete) return null;

  const text = "Orkestrim'26";
  const letters = text.split('');

  return (
    <>
      <style>{`
        #intro { position: fixed; inset: 0; z-index: 9999; background: #000; display: grid; place-items: center; overflow: hidden; }
        #intro::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle, #e5091440, transparent 55%); opacity: 0; }
        #intro .w { display: flex; white-space: pre; font: 400 min(11vw,140px) 'Bebas Neue', Impact, sans-serif; color: #e50914; letter-spacing: 0.02em; will-change: transform, opacity; }
        #intro .w span { opacity: 0; transform: translateY(26px) scale(0.92); -webkit-text-stroke: 2px #e50914; text-shadow: 0 4px 0 #8a0610, 0 0 34px #e5091480; }
        #intro.go { animation: ifade 0.9s 3s ease-in forwards; }
        #intro.go::before { animation: iglow 2.6s ease-out forwards; }
        #intro.go .w { animation: izoom 1.1s 2.7s cubic-bezier(0.5, 0, 0.8, 0.4) forwards; }
        #intro.go .w span { animation: iin 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        #intro.go::after { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 3px; background: linear-gradient(90deg, transparent, #e50914, #fff, #e50914, transparent); opacity: 0; transform: scaleX(0); animation: streak 1.3s 1.5s ease-out forwards; }
        
        @keyframes streak { 40% { opacity: 1; transform: scaleX(1); } to { opacity: 0; transform: scaleX(1.4); } }
        @keyframes iin { to { opacity: 1; transform: none; } }
        @keyframes iglow { to { opacity: 1; } }
        @keyframes izoom { to { transform: scale(3); opacity: 0; } }
        @keyframes ifade { to { opacity: 0; visibility: hidden; } }
      `}</style>
      
      <div id="intro" className={isGo ? 'go' : ''}>
        <div className="w">
          {letters.map((c, i) => (
            <span key={i} style={{ animationDelay: `${0.2 + i * 0.06}s` }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
