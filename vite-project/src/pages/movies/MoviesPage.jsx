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
                        <img src='https://m.media-amazon.com/images/I/91Rc8cAmnAL.jpg' />
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
        </>
    );
}

export default MoviesPage;
