import {useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import React from 'react'
import "./MovieGrid.css"

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;






const Search = () => {

  const [searchParams] = useSearchParams(); //SearchParams manda mais de um item, um array de funções. para separar elas, e desestruturar a primeira que precisa, que no caso seria o Q, é só desestruturar.
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q") //pega o resultado que está presente em q na url (search?q=batman), por exemplo.

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results)
  };

  useEffect(() => {
    const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`;
    getSearchedMovies(searchWithQueryUrl)
    
  }, [query]) //ao alterar a query, useEffect é atualizado.

  return (
    <div className="container">
      <h2 className="title">Resultado para: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
         {movies.length > 0 &&
     
     movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
       
        
      </div>
   
    </div>
  )
}

export default Search