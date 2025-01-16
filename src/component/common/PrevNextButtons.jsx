import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PrevNextButtons = ({ onPrev, onNext, prevDisabled, nextDisabled, customStyle }) => {
  return (
    <div className={`flex justify-between items-center ` + customStyle}>
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className={`
          flex items-center gap-2 py-2 rounded-lg 
          text-gray-600 hover:text-gray-800 
          ${prevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
        `}
      >
        <FaChevronLeft />
        <span>Previous</span>
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg 
          text-gray-600 hover:text-gray-800
          ${nextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
        `}
      >
        <span>Next</span>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PrevNextButtons;