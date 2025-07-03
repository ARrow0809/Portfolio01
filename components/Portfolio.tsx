import React, { useState, useMemo } from 'react';
import type { Project } from '../types';
import CustomDropdown from './CustomDropdown';

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
  'images/fanza/02_BukkakeMania03_パッケージ画像.jpg',
  'images/fanza/03_新BukkakeMania_パッケージ画像.jpg',
  'images/fanza/04_新BukkakeMania02_パッケージ画像.jpg',
  'images/fanza/05_ぶっかけ祭り_パッケージ画像.jpg',
];

// ファイルパスからプロジェクト情報を生成する関数
const createProjectFromPath = (path: string): Project => {
  const fileName = path.split('/').pop()?.split('.')[0] || '';
  const pathParts = path.split('/');
  const category = pathParts[1]; // kindle, nvng, thumbnail
  
  // ファイル名の最後の_〇〇がジャンル
  const parts = fileName.split('_');
  const genre = parts.pop() || 'other';
  const title = parts.join('_'); // アンダースコアを保持

  return {
    imageUrl: `/${path}`,
    title: title,
    genre: genre,
    category: category,
  };
};

const projectsData: Project[] = imageFilePaths.map(createProjectFromPath);

const ImageCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            className="group relative block w-full aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-red-900/40 transition-all duration-300"
            onClick={onClick}
        >
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
            )}
            <img 
                src={project.imageUrl} 
                alt={project.title}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 ${isLoaded ? '' : 'hidden'}`}>
                <h3 className="text-white text-base font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">{project.title}</h3>
                <p className="text-red-400 text-xs uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out delay-75">{project.genre}</p>
            </div>
        </div>
    );
};

const Lightbox: React.FC<{ 
  imageUrl: string; 
  onClose: () => void; 
  onPrev: () => void; 
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
}> = ({ imageUrl, onClose, onPrev, onNext, currentIndex, totalImages }) => {
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
    
    <img 
      src={imageUrl} 
      alt="Enlarged portfolio piece" 
      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
  );
};

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'category' | 'genre'>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const categorySet = new Set(projectsData.map(p => p.category));
    return Array.from(categorySet).sort();
  }, []);

  const genres = useMemo(() => {
    const genreSet = new Set(projectsData.map(p => p.genre));
    return Array.from(genreSet).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projectsData;
    }
    if (filterType === 'category') {
      return projectsData.filter(project => project.category === activeFilter);
    }
    if (filterType === 'genre') {
      return projectsData.filter(project => project.genre === activeFilter);
    }
    return projectsData;
  }, [activeFilter, filterType]);

  const handleFilterChange = (filter: string, type: 'all' | 'category' | 'genre') => {
    setActiveFilter(filter);
    setFilterType(type);
  };

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
    <section id="portfolio" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 font-display tracking-wider">
          PORTFOLIO
        </h2>

        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {/* ALL ボタン */}
          <button
            onClick={() => handleFilterChange('all', 'all')}
            className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 ${
              activeFilter === 'all'
                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
          >
            ALL
          </button>

          {/* CATEGORY カスタムプルダウン */}
          <CustomDropdown
            title="CATEGORY"
            options={[
              { value: 'kindle', label: 'Kindle' },
              { value: 'nvng', label: 'NVNG' },
              { value: 'fanza', label: 'FANZA' },
              { value: 'thumbnail', label: 'Thumbnail' }
            ]}
            onSelect={(value) => handleFilterChange(value, 'category')}
            selectedValue={filterType === 'category' ? activeFilter : ''}
            enableRouting={true}
            routeType="category"
          />

          {/* GENRE カスタムプルダウン */}
          <CustomDropdown
            title="GENRE"
            options={[
              { value: '表紙', label: '表紙' },
              { value: 'サムネ', label: 'サムネ' },
              { value: 'パッケージ画像', label: 'パッケージ画像' }
            ]}
            onSelect={(value) => handleFilterChange(value, 'genre')}
            selectedValue={filterType === 'genre' ? activeFilter : ''}
            enableRouting={true}
            routeType="genre"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredProjects.map((project) => (
            <ImageCard key={project.imageUrl} project={project} onClick={() => handleImageClick(project.imageUrl)} />
          ))}
        </div>
      </div>
      {selectedImageIndex !== null && (
        <Lightbox 
          imageUrl={filteredProjects[selectedImageIndex].imageUrl}
          onClose={closeLightbox}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          currentIndex={selectedImageIndex}
          totalImages={filteredProjects.length}
        />
      )}
    </section>
  );
};

export default Portfolio;