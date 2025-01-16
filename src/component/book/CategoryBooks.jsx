import React, { useState, useEffect, useCallback } from 'react';
import { bookApi } from '../../service/api';
import BookCard from "./BookCard";
import Pagination from '../common/Pagination';

const CategoryBooks = ({ categoryId }) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageSize = 20;

    const fetchBooks = useCallback(async (cId, page) => {
        if (!cId) return;
        setLoading(true);
        setBooks([])
        try {
            const data = await bookApi.getCategoryBooks(cId, page, pageSize);
            setBooks(data.data.items);
            setTotalPages(data.data.total_pages);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setCurrentPage(1);
        fetchBooks(categoryId, 1);
    }, [categoryId, fetchBooks]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchBooks(categoryId, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
                {Array.isArray(books) && books.map((book, index) => (
                    <BookCard key={`${book.slug}-${index}`} book={book} />
                ))}
            </div>
            
            {loading && (
                <div className="text-center mt-20">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}
            
            {!loading && (books===null || books.length === 0) && (
                <div className="text-center mt-20 text-gray-500">
                    No books found in this category
                </div>
            )}

            {!loading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </section>
    );
};

export default CategoryBooks;