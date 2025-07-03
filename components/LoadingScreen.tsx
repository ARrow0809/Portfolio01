import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // フェードアウト時間
          return 100;
        }
        return prev + Math.random() * 15; // ランダムな進捗増加
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-[9999] flex items-center justify-center">
      <div className="text-center">
        {/* ロゴアニメーション */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-display tracking-wider animate-pulse">
            <span className="text-white">ARROW</span>
            <span className="text-red-500 animate-bounce">.</span>
            <span className="text-red-500">AI</span>
          </h1>
        </div>

        {/* 進捗バー */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          {/* 進捗率表示 */}
          <div className="text-white text-lg font-semibold">
            {Math.floor(Math.min(progress, 100))}%
          </div>
          
          {/* ローディングドット */}
          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;