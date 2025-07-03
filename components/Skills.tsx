import React from 'react';

const Skills: React.FC = () => {
  const skills = [
    {
      title: "AI画像生成",
      description: "Midjourney、Stable Diffusion、DALLEなどを駆使した高品質な画像制作",
      icon: "🎨"
    },
    {
      title: "Kindle出版デザイン",
      description: "表紙デザインから内容レイアウトまで、売れる本の制作をサポート",
      icon: "📚"
    },
    {
      title: "YouTubeサムネイル",
      description: "クリック率を向上させる魅力的なサムネイルデザイン",
      icon: "📺"
    },
    {
      title: "NVNG作品制作",
      description: "成人向けコンテンツの制作で収益化をサポート",
      icon: "🔞"
    },
    {
      title: "ブランディング",
      description: "SNSアイコンからロゴまで、一貫したブランドイメージを構築",
      icon: "✨"
    },
    {
      title: "収益化コンサル",
      description: "制作だけでなく、マネタイズ戦略もアドバイス",
      icon: "💰"
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 font-display tracking-wider">
          SKILLS & SERVICES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors duration-300">
                {skill.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;