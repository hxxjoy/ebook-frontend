import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UsePageView = () => {
  const location = useLocation();

  useEffect(() => {
    // 更新 Data Layer 的页面数据
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view', // GA4 的 page_view 事件
      page_path: location.pathname, // 当前页面路径
      page_title: document.title,  // 当前页面标题
    });

    console.log('Page view triggered:', {
      page_path: location.pathname,
      page_title: document.title,
    });
  }, [location]); // location 改变时触发
};

export default UsePageView;
