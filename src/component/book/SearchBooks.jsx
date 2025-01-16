import React, { useState, useEffect, useRef,useCallback } from 'react';
import { bookApi } from '../../service/api';
import BookCard from "./BookCard";

const SearchBooks = ({ word }) => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerTarget = useRef(null);
    const currentWord = useRef(word);
    const isFirstLoad = useRef(true);

    // 获取数据的函数
    const fetchBooks = useCallback(async (searchWord, pageNum, isNewSearch = false) => {
        //if (loading) return;
        
        setLoading(true);
        try {
            const data = await bookApi.getSearchBooks(searchWord, pageNum);
            setBooks(prev => isNewSearch ? data.data.items : [...prev, ...data.data.items]);
            setHasMore(pageNum < data.data.total_pages);
            if(pageNum === 1) {
                window.scrollTo(0, 0)
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);

        }
    },[]);

    // 首次加载和搜索词变化时的处理
    useEffect(() => {
        // 首次加载
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            if (word) {
                fetchBooks(word, 1, true);
            }
            return;
        }

        // 搜索词变化
        if (word !== currentWord.current) {
            currentWord.current = word;
            setBooks([]);
            setPage(1);
            setHasMore(true);
            if (word) {
                fetchBooks(word, 1, true);
            }
        }
    }, [word,fetchBooks]);

    // 处理滚动加载更多
    useEffect(() => {
        if (!isFirstLoad.current && page > 1 && word) {
            fetchBooks(word, page, false);
        }
    }, [word,page,fetchBooks]);

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

    return (
        <section className="py-8">
            {!books && !loading && (
                <div className="text-center py-4 text-gray-500">
                No results found
                </div>
            )}
            {books && books.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
                    {books.map(book => (
                        <BookCard key={book.slug} book={book} />
                    ))}
                </div>
            )}
            
            {loading && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}
            
            {!loading && hasMore && (
                <div ref={observerTarget} className="h-10" />
            )}
            
            {!hasMore && books && books.length > 0 && (
                <div className="text-center py-4 text-gray-500 mt-20">
                    No More
                </div>
            )}
        </section>
    );
};

export default SearchBooks;