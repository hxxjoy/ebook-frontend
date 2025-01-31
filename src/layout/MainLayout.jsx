import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/common/Header';
import Footer from '../component/common/Footer';

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isMobile={isMobile} />
      <main className="flex-grow container mx-auto px-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;