
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  function fetchMovies() {
    axios
      .get("http://localhost:3000/api/movies", {
        params: {
          search: search,
        },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Errore nel fetch", error);
      });
  }

  function searchMovies(e) {
    e.preventDefault();
    fetchMovies();
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <section>
        <div>
          <h1>Lista Film</h1>
          <form onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="Cerca un film..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Cerca</button>
          </form>
        </div>
        <div className="cards-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>Nessun film trovato</p>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
