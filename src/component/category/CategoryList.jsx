// CategoryList.jsx
import React, { useState, useRef } from 'react';
import './CategoryList.css';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const categoriesRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = [
    { id: 1, name: 'Music, History, Social Books', count: 6 },
    { id: 2, name: 'History, Social Books', count: 4 },
    { id: 3, name: 'Social Books', count: 3 },
    { id: 4, name: 'Music, Social Books', count: 5 },
    { id: 5, name: 'Music, History, Social Books4', count: 2 },
    { id: 6, name: 'Music, History, Social Books5', count: 3 },
    { id: 7, name: 'Music, History, Social Books6', count: 6 },
    { id: 8, name: 'Music, History, Social Books7', count: 4 },
    { id: 9, name: 'Music, History, Social Books8', count: 3 },
    { id: 10, name: 'Music, History, Social Books9', count: 5 },
    { id: 11, name: 'Music, History, Social Books10', count: 2 },
    { id: 12, name: 'Music, History, Social Books11', count: 3 },
    { id: 13, name: 'Music, History, Social Books12', count: 6 },
    { id: 14, name: 'Music, History, Social Books13', count: 4 },
    { id: 15, name: 'Music, History, Social Books14', count: 3 }
  ];

  const books = {
    1: [
      { id: 1, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
      { id: 2, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
      { id: 3, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
      { id: 4, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
      { id: 5, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
      { id: 6, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
      { id: 7, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
      { id: 8, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
      // ...更多书籍
    ],
    2: [
        { id: 1, title: '书df题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 2, title: '书籍adf标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 3, title: '书籍dfh标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 4, title: '书q籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 5, title: '书r籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 6, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 7, title: '书籍t标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 8, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        // ...更多书籍
      ],
      3: [
        { id: 1, title: '书籍uii标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 2, title: '书asdf籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 3, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 4, title: '书籍标iii题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 5, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 6, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 7, title: '书籍ii标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 8, title: '书籍ii标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        // ...更多书籍
      ],
      4: [
        { id: 1, title: '书籍标56678题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 2, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 3, title: '书籍gg45标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 4, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 5, title: '书籍yk标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 6, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 7, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 8, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        // ...更多书籍
      ],
      5: [
        { id: 1, title: '书籍7u78标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 2, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 3, title: '书rt籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 4, title: '书籍y标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 5, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 6, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 7, title: '书籍标fgs题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 8, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        // ...更多书籍
      ],
      6: [
        { id: 1, title: '书dsfg籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 2, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 3, title: '书籍sdfg标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 4, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 5, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 6, title: '书籍标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        { id: 7, title: '书籍标题 1', author: '作者 1', cover: '/image/cover.jpg' },
        { id: 8, title: '书籍78标题 2', author: '作者 2', cover: '/image/cover.jpg' },
        // ...更多书籍
      ],
    // ...其他分类的书籍
  };

  // 处理左右按钮点击滚动
  const handleScroll = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? categoriesRef.current.scrollLeft - scrollAmount
        : categoriesRef.current.scrollLeft + scrollAmount;
      
      categoriesRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // 开始拖拽
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - categoriesRef.current.offsetLeft);
    setScrollLeft(categoriesRef.current.scrollLeft);
  };

  // 拖拽中
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };

  // 结束拖拽
  const handleMouseUp = (e) => {
    setIsDragging(false);
    // 如果拖拽距离很小，视为点击事件
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = Math.abs(x - startX);
    if (walk < 5) {
      // 找到点击的类别元素并触发选中
      const clickedElement = e.target.closest('.category-item');
      if (clickedElement) {
        const categoryId = parseInt(clickedElement.dataset.categoryId);
        setSelectedCategory(categoryId);
      }
    }
  };

  // 鼠标离开时结束拖拽
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="category-section">
      <h2 className="section-title">Category</h2>
      
      <div className="categories-container">
        <button 
          className="scroll-button left"
          onClick={() => handleScroll('left')}
        >
          &lt;
        </button>
        
        <div 
          className={`categories-section ${isDragging ? 'dragging' : ''}`}
          ref={categoriesRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {categories.map(category => (
            <div
              key={category.id}
              data-category-id={category.id}
              className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            >
              <div className="category-name">{category.name}</div>
              <div className="category-count">{category.count} 本书</div>
            </div>
          ))}
        </div>

        <button 
          className="scroll-button right"
          onClick={() => handleScroll('right')}
        >
          &gt;
        </button>
      </div>

      <div className="books-section">
        <div className="books-grid">
          {books[selectedCategory]?.map(book => (
            <div key={book.id} className="book-card">
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;