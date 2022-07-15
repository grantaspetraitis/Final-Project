import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <Link to={`/questions/${props.data.post_id}`}>
            <div className="card-container">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {props.data.post_title}
                </div>
            </div>
        </Link>
    );
}

export default Card;