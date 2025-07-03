import React from 'react';
import { GitHubIcon, LinkedinIcon, TwitterIcon } from './IconComponents';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-700 py-16">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display tracking-wider">
          CONTACT
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          プロジェクトのご相談、お仕事の依頼は下記SNSのDMよりお気軽にご連絡ください。
        </p>
        <div className="flex justify-center items-center gap-8 mb-10">
            <a href="https://twitter.com/ARrow25989974" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-transform duration-300 transform hover:scale-110">
              <TwitterIcon className="w-9 h-9" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-transform duration-300 transform hover:scale-110">
              <GitHubIcon className="w-9 h-9" />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-transform duration-300 transform hover:scale-110">
              <LinkedinIcon className="w-9 h-9" />
            </a>
        </div>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ARROW.AI. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
