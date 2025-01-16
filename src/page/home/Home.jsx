import React, { useState, useEffect } from 'react';
import FeaturedBooks from '../../component/book/FeaturedBooks';
import PopularBooks from '../../component/book/PopularBooks';
import { bookApi } from '../../service/api';
import './Home.css';

const Home = () => {
  // 状态管理
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    const loadData = async () => {
      let data = await bookApi.getFeaturedBooks()
      setFeaturedBooks(data.data.items)
      setIsLoading(false);
    };
    loadData()

  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <FeaturedBooks books={featuredBooks} />
      <PopularBooks />
    </div>
  );
};

export default Home;