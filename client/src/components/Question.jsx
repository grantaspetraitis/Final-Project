import { Link } from "react-router-dom";

const Question = (props) => {
    return (
        <Link to={`/questions/${props.data.post_id}`}>
            <div className="question-container">
                <h1 style={{ color: "grey" }}>{props.data.post_title}</h1>
                <p>{props.data.post_body}</p>
            </div>
        </Link>
    );
}

export default Question;