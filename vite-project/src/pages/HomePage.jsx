import { useEffect, useState,useContext } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import GlobalContext from "../../../context/globalContext";

function HomePage() {
  const { setIsLoading } = useContext(GlobalContext);
  
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  function fetchMovies() {
   setIsLoading(true);

    console.log("Chiamata API per:", search);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function searchMovies(e) {
    e.preventDefault();
    console.log('Ricerca del film')
    fetchMovies();
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <section>
        <div>
          <h1 className="mainTitle">Lista Film</h1>
          <form className="formSection" onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="Cerca un film..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="formButton" type="submit">Cerca</button>
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
