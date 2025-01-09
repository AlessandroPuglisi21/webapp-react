import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const { id, title, director, genre, release_year, abstract, image } = movie;

    return (
        <article className="movie-card">
            <img src={image} alt={title} />
            <div>
                <h3 className="movieTitle">{title}</h3>
                <p>{director}</p>
                <p>{release_year}</p>
                <p>{genre}</p>
                <p>{abstract}</p>
                <Link to={`/movies/${id}`}>Dettagli</Link>
            </div>
        </article>
    );
}

export default MovieCard;

