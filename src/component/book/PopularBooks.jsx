import React, { useState, useEffect, useRef } from 'react';
import BookCard from './BookCard';
import { bookApi } from '../../service/api';

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const isFirstRender = useRef(true)

  // 模拟获取数据的函数
  const fetchBooks = async (page) => {
    setLoading(true);
    try {
      let data = await bookApi.getPopularBooks(page)
      setBooks(prev => [...prev, ...data.data.items])
      setHasMore(page < data.data.total_pages);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // 设置 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  // 获取数据
  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }
    fetchBooks(page);
  }, [page]);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 px-4">Popular Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
        {books.map(book => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
      
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      
      {!loading && hasMore && (
        <div ref={observerTarget} className="h-10" />
      )}
      
      {!hasMore && (
        <div className="text-center py-4 text-gray-500 mt-20">
          No More
        </div>
      )}
    </section>
  );
};

export default PopularBooks;