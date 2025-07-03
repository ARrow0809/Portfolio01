import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  title: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  enableRouting?: boolean;
  routeType?: 'category' | 'genre';
  currentCategory?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
  title, 
  options, 
  onSelect, 
  selectedValue,
  enableRouting = false,
  routeType = 'category',
  currentCategory = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (value: string) => {
    onSelect(value);
    setIsOpen(false);
    
    // ルーティング機能が有効な場合
    if (enableRouting) {
      if (routeType === 'category') {
        navigate(`/category/${value}`);
      } else if (routeType === 'genre') {
        navigate(`/genre/${value}`);
      }
    }
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ドロップダウンボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 min-w-[120px] ${
          selectedValue && selectedValue !== ''
            ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
        }`}
      >
        {selectedOption ? selectedOption.label : title}
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[160px] bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-50 animate-[slideDown_0.2s_ease-out]">
          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                selectedValue === option.value
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;