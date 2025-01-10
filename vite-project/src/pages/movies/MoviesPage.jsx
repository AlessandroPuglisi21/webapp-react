import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewCards from "../../components/ReviewCards";

function MoviesPage() {
    const [movie, setMovies] = useState(null);
    const { id } = useParams();

    function fetchMovie() {
        axios
            .get(`http://localhost:3000/api/movies/${id}`)
            .then((response) => {
                setMovies(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Errore nel fetch", error);
            });
    }

    useEffect(() => {
        fetchMovie();
    }, [id]);

    return (
        <>
            {movie ? (
                <section>
                    <div className="movieDetails">
                        <h1 className="mainTitle">{movie.title.toUpperCase()}</h1>
                        <img src={`http://localhost:3000${movie.image}`} alt={movie.title} />
                        <div className="movieInfo">
                            <p><strong>Regista: </strong>{movie.director}</p>
                            <p><strong>Anno di Uscita: </strong> {movie.release_year}</p>
                            <p><strong>Genere: </strong>{movie.genre}</p>
                            <p><strong>Descrizione: </strong> {movie.abstract}</p>
                        </div>
                    </div>
                </section >
            ) : (
                <p>Caricamento...</p>
            )}
            <section>
                <div className="reviewContainer">
                    <h1>Recensioni:</h1>
                    {movie && movie.reviews && movie.reviews.length > 0 ? (
                        <ul>
                            {movie.reviews.map(review => (
                                <ReviewCards review={review} key={review.id} />
                            ))}
                        </ul>
                    ) : (
                        <div>Nessuna recensione</div>
                    )}
                </div>
            </section>
            <form action="" className="formReview">
                <h3>INSERISCI RECENSIONE</h3>
                <p>
                <label htmlFor="Nome">NOME:</label>
                <input type="text" placeholder="Il tuo Nome" name='name' id='name' />
                </p>
                <p>
                <label htmlFor="Nome">RECENSIONE:</label>
                <input type="textarea" placeholder="Recensione" name='text' id='text' />
                </p>
                <p className='form-control'>
              <label htmlFor="vote">Voto</label>
              <select name="vote" id="vote">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
              </select>
            </p>
            <button>INVIA</button>
            </form>
        </>
    );
}

export default MoviesPage;
