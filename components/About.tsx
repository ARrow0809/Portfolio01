import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-800">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display tracking-wider">
              ABOUT ME
            </h2>
            <div className="relative">
              <img 
                src="/images/sozai/あろうAiデザインメンター_icon.jpeg" 
                alt="プロフィールアイコン" 
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full border-2 border-red-500/70 shadow-lg shadow-red-500/30 hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 rounded-full border border-red-400/30"></div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-300">
            <p className="text-lg leading-relaxed">
              AI×デザインの力で、クリエイターの収益化を支援するデザイナーです。
              1,000件以上の案件を通じて培った経験で、あなたのアイデアを収益に変えるお手伝いをします。
            </p>
            <p className="text-lg leading-relaxed">
            グラフィックデザインをはじめ、Kindle出版、YouTubeサムネイルなど、幅広いジャンルでの制作実績があります。
              AIツールを活用した効率的なワークフローで、高品質な作品を短期間で制作いたします。
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-red-500">1000+</div>
                <div className="text-sm text-gray-400">制作実績</div>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-red-500">3年+</div>
                <div className="text-sm text-gray-400">AI活用経験</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;