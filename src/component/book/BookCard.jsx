import useResponsive from '../../hook/useResponsive';
import { Link } from 'react-router-dom';
import Image from '../common/Image'

const BookCard = ({ book }) => {
  const { isMobile } = useResponsive();

  return (
    <div className={`
      book-card
      ${isMobile ? 'w-full p-2' : 'w-[180px] p-4'}
      transition-all duration-300
      hover:shadow-lg
      cursor-pointer
      rounded-lg
      flex flex-col items-center
      
    `}>
      <Link 
      to={`/book/${book.slug}`} 
        className={`
          book-card
          ${isMobile ? 'w-full p-2' : 'w-[180px] p-4'}
          transition-all duration-300
          hover:shadow-none
          cursor-pointer
          rounded-lg
          flex flex-col items-center
          no-underline
        `}
      >
      <Image
        src={book.cover}
        alt={book.title}
        className="w-32 h-32 object-contain mb-3"
      />
      <h3 className="text-sm font-medium text-center mb-1 line-clamp-2">
        {book.title}
      </h3>
      </Link>
      {book.author && (
        <p className="text-xs text-gray-500 text-center">
          {book.author}
        </p>
      )}
      {book.description && (
        <p className="text-xs text-gray-400 mt-1 text-center line-clamp-2">
          {book.description}
        </p>
      )}
    </div>
  );
};

export default BookCard;