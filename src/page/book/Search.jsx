import React from 'react';
import SearchBooks from '../../component/book/SearchBooks';
import { useParams } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const { word } = useParams()
  return (
    <div className="home-page">
      <SearchBooks word={word}/>
    </div>
  );
};

export default Search;