import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-800">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-display tracking-wider">
          CONTACT
        </h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          Feel free to reach out for project consultations and work requests.
          I support your monetization with AI x Design.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-700 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Design Projects</h3>
            <p className="text-gray-300 mb-6">
              Kindle publishing, NVNG works, thumbnail creation - wide range of genres supported
            </p>
            <a 
              href="https://twitter.com/ARrow25989974" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              DM on Twitter
            </a>
          </div>
          
          <div className="bg-gray-700 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Monetization Consulting</h3>
            <p className="text-gray-300 mb-6">
              Consulting on AI tool utilization and monetization strategies
            </p>
            <a 
              href="https://twitter.com/ARrow25989974" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Get Consultation
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">Response time: Within 24 hours</p>
          <p className="text-sm text-gray-500">
            * Pricing varies based on project content and timeline. Please feel free to consult first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;