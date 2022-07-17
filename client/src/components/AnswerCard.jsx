import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context";
import EditAnswer from "./EditAnswer";
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const AnswerCard = (props) => {

    const { login } = useContext(AppContext);
    const [editForm, setEditForm] = useState(null);

    const handleClick = () => {
        setEditForm(<EditAnswer id={props.answer_id} body={props.body} />);
    }

    const onClose = () => {
        setEditForm(null);
    }


    return (
        <div className="answer-card-container">
            {props.wasEdited === '1' && <p style={{ fontStyle: "italic" }}>edited at {props.edit_date.substring(0, 16).replace('T', ' ')}</p>}
            <span>{props.user}</span>
            <h3>{props.body}</h3>
            <span>{props.post_date.substring(0, 16).replace('T', ' ')}</span>
            <ThumbUpIcon onClick={() => props.onClick(1)} className="ml-30" style={{ cursor: "pointer" }} />
            <ThumbDownIcon onClick={() => props.onClick(-1)} className="ml-10" style={{ cursor: "pointer" }} />
            <span className="ml-10">{props.rating}</span>

            {
                login ?
                    <>
                        {!editForm && <div><button className="btn" onClick={handleClick}>Edit answer</button></div>}
                        {editForm && <div><CloseIcon onClick={onClose} style={{ cursor: "pointer" }} /></div>}
                        {editForm}
                    </>

                    :

                    null
            }
        </div>
    );
}

export default AnswerCard;