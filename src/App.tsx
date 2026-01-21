
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('hr');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const renderPage = () => {
    const props = { lang, setCurrentPage };
    switch (currentPage) {
      case 'home': return <Home {...props} />;
      case 'about': return <About {...props} />;
      case 'contact': return <Contact {...props} />;
      case 'privacy': return <Privacy {...props} />;
      default: return <Home {...props} />;
    }
  };

  return (
    <Layout 
      lang={lang} 
      setLang={setLang} 
      theme={theme}
      setTheme={setTheme}
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
