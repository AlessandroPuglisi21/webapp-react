import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewCards from "../../components/ReviewCards";
import GlobalContext from "../../../../context/globalContext";

const initialFormData = {
  vote: 1,
  name: "",
  text: "",
};

function MoviesPage() {
  const [movie, setMovies] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isFormValid, setIsFormValid] = useState(true);
  const { id } = useParams();

const { setIsLoading } = useContext(GlobalContext);

  function fetchMovie() {
    axios
      .get(`http://localhost:3000/api/movies/${id}`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Errore nel fetch", error);
      })
      .finally	(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchMovie();
  }, [id]);

  function onFormChange(e) {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function storeReview(e) {
    e.preventDefault();
    setIsFormValid(true);

    const data = {
      text: formData.text.trim() || undefined,
      name: formData.name.trim(),
      vote: parseInt(formData.vote),
    };

    if (!data.name || !data.vote || data.vote < 1 || data.vote > 5) {
      setIsFormValid(false);
      return;
    }

    axios
      .post(`http://localhost:3000/api/movies/${id}/review`, data)
      .then(() => {
        setFormData(initialFormData);
        fetchMovie();
      })
      .catch((err) => {
        console.error(err);
        setIsFormValid(false);
      });
  }

  return (
    <>
      {movie ? (
        <section>
          <div className="movieDetails">
            <h1 className="mainTitle">{movie.title.toUpperCase()}</h1>
            <img src={`http://localhost:3000${movie.image}`} alt={movie.title} />
            <div className="movieInfo">
              <p><strong>Regista: </strong>{movie.director}</p>
              <p><strong>Anno di Uscita: </strong>{movie.release_year}</p>
              <p><strong>Genere: </strong>{movie.genre}</p>
              <p><strong>Descrizione: </strong>{movie.abstract}</p>
            </div>
          </div>
        </section>
      ) : (
        <p>Caricamento...</p>
      )}
      <section>
        <div className="reviewContainer">
          <h1>Recensioni:</h1>
          {movie && movie.reviews && movie.reviews.length > 0 ? (
            <ul>
              {movie.reviews.map((review) => (
                <ReviewCards review={review} key={review.id} />
              ))}
            </ul>
          ) : (
            <div>Nessuna recensione</div>
          )}
        </div>
      </section>
      <div className="formReview">
        <h3>INSERISCI RECENSIONE</h3>
        <form onSubmit={storeReview} className={`flex flex-col gap-3 ${!isFormValid ? 'animate__animated animate__shakeX': ''}`}>
          <p className="form-control">
            <label htmlFor="name">Nome *</label>
            <input
              required
              type="text"
              placeholder="Il tuo Nome"
              name="name"
              id="name"
              value={formData.name}
              onChange={onFormChange}
            />
          </p>
          <p className="form-control">
            <label htmlFor="text">Recensione</label>
            <textarea
              rows="4"
              name="text"
              id="text"
              placeholder="Scrivi la tua recensione"
              value={formData.text}
              onChange={onFormChange}
            ></textarea>
          </p>
          <p className="form-control">
            <label htmlFor="vote">Voto *</label>
            <select
              required
              name="vote"
              id="vote"
              value={formData.vote}
              onChange={onFormChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
          <div className="flex gap-4 items-center">
            {isFormValid === false && (
              <div className="text-red-500">I dati non sono validi</div>
            )}
            <button className="ml-auto bg-blue-950 hover:bg-blue-800 text-white h-10 rounded-lg px-6">
              Invia
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MoviesPage;
