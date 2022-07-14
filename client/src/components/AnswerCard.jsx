const AnswerCard = (props) => {
    return (
        <div className="answer-card-container">
            <span>{props.user}</span>
            <h1>{props.body}</h1>
            <span>{props.post_date.substring(0, 16).replace('T', ' ')}</span>
        </div>
    );
}

export default AnswerCard;