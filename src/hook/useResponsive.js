import { useState, useEffect } from 'react';

// 定义断点
const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
};

const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // 处理窗口大小变化
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 添加事件监听
    window.addEventListener('resize', handleResize);
    
    // 清理事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 返回各种设备的布尔值和当前宽度
  return {
    isMobile: windowWidth <= breakpoints.mobile,
    isTablet: windowWidth > breakpoints.mobile && windowWidth <= breakpoints.tablet,
    isLaptop: windowWidth > breakpoints.tablet && windowWidth <= breakpoints.laptop,
    isDesktop: windowWidth > breakpoints.laptop,
    currentWidth: windowWidth,
    breakpoints, // 导出断点配置以供参考
  };
};

export default useResponsive;