const Card = (props) => {
    return (
        <div className="card-container">
            <div>
                <span>Question: </span>{props.data.post_title}
            </div>
            <div>
                <span>Likes: </span>{props.data.like_amount}
            </div>
        </div>
    );
}

export default Card;