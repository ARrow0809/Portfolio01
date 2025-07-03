import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gray-900">
      <div 
        className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain animate-kenburns"
        style={{
          backgroundImage: "url('/images/sozai/250703_X用_Banner.jpeg')",
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 p-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display text-white tracking-wider" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          ARROW<span className="text-red-500">.</span><span className="text-red-500">AI</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
          AI×デザインで収益化する未来へ。1,000件以上の案件経験で、あなたのマネタイズを完全サポート。
        </p>
      </div>
    </section>
  );
};

export default Hero;