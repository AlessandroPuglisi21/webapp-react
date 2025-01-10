

function ReviewCards ({ review }){
const { vote, name, text } = review;

return(
    <div className="review-card">
        <p>{text}</p>
        <div>
            Voto: {vote}
        </div>
        <div>
            By: {name}
        </div>
    </div>
)
}

export default ReviewCards;