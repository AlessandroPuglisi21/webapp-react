import StarsReview from "./StarsReview";

function ReviewCards({ review }) {
  const { vote, name, text } = review;

  return (
    <div className="review-card">
      <p>{text}</p>
      <div>
        Voto: <StarsReview rating={vote} />
      </div>
      <div>
        By: {name}
      </div>
    </div>
  );
}

export default ReviewCards;
