import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Project } from '../types';

// 実際の画像ファイルパス
const imageFilePaths = [
  // Kindle作品
  'images/kindle/うさこと森のお友達_表紙.jpg',
  'images/kindle/アイモンずかん_赤系_表紙.jpg',
  'images/kindle/アイモンずかん_青系_表紙.jpg',
  'images/kindle/エリーの魔法の鼻_カバー画像用_表紙.jpg',
  'images/kindle/クサ太郎_カバー画像用_表紙.jpg',
  'images/kindle/ココのだいぼうけん_表紙.jpg',
  'images/kindle/メタマジック★ハロウィンパーティー_表紙.jpg',
  'images/kindle/奇跡の星のクリスマス_表紙.jpg',
  // NVNG作品
  'images/nvng/cyberina_表紙.jpg',
  'images/nvng/majicmixRealistic_v6_表紙.jpg',
  'images/nvng/「AI電創乙女」 冴羽リナ_表紙.jpg',
  'images/nvng/「AI電創乙女」時宙ミキ_表紙.jpg',
  'images/nvng/夢のビキニパラダイス_表紙.jpg',
  'images/nvng/社畜サバイブ01_表紙.jpg',
  'images/nvng/社畜サバイブ02_表紙.jpg',
  // サムネイル作品
  'images/thumbnail/06がいな魂SNS_サムネ.jpg',
  'images/thumbnail/18バナー広告_サムネ.jpg',
  'images/thumbnail/19youtube_サムネ.jpg',
  'images/thumbnail/youtubeサムネ集_サムネ.jpg',
  // FANZA作品
  'images/fanza/01_vol001_パッケージ画像.jpg',
  'images/fanza/02_新BukkakeMania_パッケージ画像.jpg',
  'images/fanza/03_新BukkakeMania02_パッケージ画像.jpg',
  'images/fanza/04_BukkakeMania03_パッケージ画像.jpg',
  'images/fanza/05_ぶっかけ祭り_パッケージ画像.jpg',
];

const createProjectFromPath = (path: string): Project => {
  const fileName = path.split('/').pop()?.split('.')[0] || '';
  const pathParts = path.split('/');
  const category = pathParts[1];
  
  const parts = fileName.split('_');
  const genre = parts.pop() || 'other';
  const title = parts.join('_');

  return {
    imageUrl: `/${path}`,
    title: title,
    genre: genre,
    category: category,
  };
};

const projectsData: Project[] = imageFilePaths.map(createProjectFromPath);

// Lightboxコンポーネント
const Lightbox: React.FC<{ 
  imageUrl: string; 
  onClose: () => void; 
  onPrev: () => void; 
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
  project: Project;
}> = ({ imageUrl, onClose, onPrev, onNext, currentIndex, totalImages, project }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      
      {/* 閉じるボタン */}
      <button className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-red-500 transition-colors z-10" onClick={onClose}>
        &times;
      </button>
      
      {/* 画像カウンター */}
      <div className="absolute top-4 left-6 text-white text-lg font-semibold z-10">
        {currentIndex + 1} / {totalImages}
      </div>
      
      {/* 前へボタン */}
      {currentIndex > 0 && (
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-red-500 transition-all duration-300 hover:scale-110 z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          ◀
        </button>
      )}
      
      {/* 次へボタン */}
      {currentIndex < totalImages - 1 && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold hover:text-red-500 transition-all duration-300 hover:scale-110 z-10 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          ▶
        </button>
      )}
      
      <div className="text-center">
        <img 
          src={imageUrl} 
          alt="Enlarged portfolio piece" 
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mb-4"
          onClick={(e) => e.stopPropagation()}
        />
        {/* 画像情報 */}
        <div className="text-white">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-red-400 text-sm uppercase tracking-wider">
            {project.category} / {project.genre}
          </p>
        </div>
      </div>
    </div>
  );
};

const GenrePage: React.FC = () => {
  const { genreName } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => project.genre === genreName);
  }, [genreName]);

  const handleImageClick = (imageUrl: string) => {
    const index = filteredProjects.findIndex(project => project.imageUrl === imageUrl);
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredProjects.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* ヘッダー */}
      <header className="bg-gray-900/95 backdrop-blur-sm py-4 border-b border-gray-700">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-display tracking-wider text-white hover:text-red-500 transition-colors"
          >
            <span className="text-white">ARROW</span><span className="text-red-500">.AI</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-display tracking-wider">
              GENRE: <span className="text-red-500">{genreName}</span>
            </h1>
            <p className="text-gray-400 text-lg">
              {filteredProjects.length} works found
            </p>
          </div>

          {/* 作品グリッド */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group relative block w-full aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-300 cursor-pointer"
                  onClick={() => handleImageClick(project.imageUrl)}
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white text-sm font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                      {project.title}
                    </h3>
                    <p className="text-red-400 text-xs uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out delay-75">
                      {project.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 作品が見つからない場合 */
            <div className="text-center py-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-400 mb-4">No works found</h2>
                <p className="text-gray-500 text-lg">
                  No works found in genre "{genreName}"
                </p>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors font-semibold"
                >
                  Back to Portfolio
                </button>
                <div>
                  <button
                    onClick={() => navigate('/')}
                    className="text-gray-400 hover:text-white transition-colors underline"
                  >
                    View all categories
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox 
          imageUrl={filteredProjects[selectedImageIndex].imageUrl}
          onClose={closeLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          currentIndex={selectedImageIndex}
          totalImages={filteredProjects.length}
          project={filteredProjects[selectedImageIndex]}
        />
      )}
    </div>
  );
};

export default GenrePage;