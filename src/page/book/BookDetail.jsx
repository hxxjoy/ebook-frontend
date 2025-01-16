import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Image from '../../component/common/Image';
import { bookApi } from '../../service/api';
import { getLanguageName } from '../../util/language';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await bookApi.getBook(id);
        setBook(data.data.book);
        setCategories(data.data.categories);
        setChapters(data.data.chapters);
      } catch (error) {
        console.error('Failed to load book:', error);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="container max-w-6xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="max-w-lg sm:w-1/8 md:w-1/6 md:mb-0">
          <Link to={`/book/read/${book.slug}`}>
            <Image
              src={book.cover}
              alt={book.title}
              className="w-3/8 sm:w-full md:w-full rounded-lg shadow mx-auto"
            />
          </Link>
        </div>
        <div className="flex-grow md:ml-10">
          <h1 className="text-2xl font-bold mb-4 mt-5">
            <Link to={`/book/read/${book.slug}`}>{book.title}</Link>
          </h1>
          <p className="mb-5 text-sm md:text-base">
            {categories.map((category, index) => (
              <span key={category.id} className="mr-2">
                {category.title}
                {index < categories.length - 1 && ', '}
              </span>
            ))}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Rating', value: book.rating === null ? '60/100' : `${book.rating}/100` },
              { label: 'Language', value: getLanguageName(book.language) },
              { label: 'Author', value: book.author || 'N/A' },
              { label: 'Chapters', value: book.chapter_count || 'N/A' },
              { label: 'Reads', value: book.view_count === 0 ? 800 : book.view_count },
              { label: 'Bookmarks', value: book.favorite_count === 0 ? 800 : book.favorite_count },
            ].map((item, index) => (
              <div key={index} className="text-gray-600 text-sm">
                <p className="text-gray-600 text-sm md:text-base">{item.label}：{item.value}</p>
               
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4 mt-4 justify-center">
            <Link to={`/book/read/${book.slug}`} className="w-auto">
              <button className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                Read
              </button>
            </Link>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
              Favorite
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{book.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Chapters</h2>
        <div className="space-y-2">
          {chapters.map((chapter, index) => (
            <div key={index} className="p-2 hover:bg-gray-50 cursor-pointer">
              <Link to={`/book/read/${book.slug}/${chapter.slug}`} className="block text-sm md:text-base">
                {chapter.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;