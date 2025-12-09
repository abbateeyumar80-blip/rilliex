import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Achievements from './components/Achievements';
import Schedule from './components/Schedule';
import SocialMatrix from './components/SocialMatrix';
import AICoach from './components/AICoach';
import LoginModal from './components/LoginModal';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import { useLanguage } from './contexts/LanguageContext';
import { Lock, Unlock } from 'lucide-react';

const AppContent = () => {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white selection:bg-tennis-green selection:text-black font-sans">
      <Navbar scrollToSection={scrollToSection} />
      
      <main className="space-y-0">
        <Hero scrollToSection={scrollToSection} />
        <Gallery />
        <Achievements />
        <Schedule />
        <SocialMatrix />
        
        {/* Contact/Footer Section */}
        <section id="contact" className="py-24 bg-black border-t border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-tennis-green/5 blur-[100px] pointer-events-none"></div>
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-serif text-white mb-6">{t.contact.title}</h2>
            <p className="text-gray-400 mb-10 font-light text-lg">
              {t.contact.desc}
            </p>
            <a 
              href="mailto:contact@rilliex.com"
              className="inline-block border border-white/20 px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              {t.contact.cta}
            </a>
            
            <div className="mt-24 text-[10px] text-gray-600 uppercase tracking-widest flex flex-col gap-6 items-center">
              <span>© {new Date().getFullYear()} Rilliex Tennis. {t.contact.rights}</span>
              
              {/* Admin Login Trigger */}
              <button 
                onClick={() => isAuthenticated ? logout() : setIsLoginOpen(true)}
                className="text-gray-800 hover:text-gray-500 transition-colors p-2"
                title={isAuthenticated ? "Logout" : "Creator Login"}
              >
                {isAuthenticated ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating AI Widget */}
      <AICoach />

      {/* Admin Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;