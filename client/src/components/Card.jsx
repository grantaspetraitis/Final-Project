import { Link } from "react-router-dom";

const Card = (props) => {

    return (
        <Link to={`/questions/${props.data.post_id}`}>
            <div className="card-container">
                <span style={{}}>
                    {props.data.post_title}
                    {
                        props.data.isArchived === '1' ? <span style={{ fontStyle: "italic" }}> (Archived)</span> : props.data.isDeletedByAdmin === '1' && <span style={{ fontStyle: "italic" }}> (deleted by admin)</span>
                    }
                </span>
            </div>
        </Link>
    );
}

export default Card;