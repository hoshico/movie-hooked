import { useEffect, useState } from "react";
import "../App.css";
import { Header } from "./Header";
import { Movie } from "./Movie";
import { Search } from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
  const onClick = (e) => {
    const newList = [...list, e.target.textContent];
    setList(newList);
    console.log(list);
  }
  


  return (
    <div className="App">
      <Header text="Watch more!" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} onClick={onClick}/>
          ))
        )}
      </div>
      <p className="list_title">want to do</p>
      <ul className="list">
        {list.map((movie, index) => {
          return (
            <li key={index}>{movie}</li>
          )
        })}
      </ul>


    </div>
  );
}
