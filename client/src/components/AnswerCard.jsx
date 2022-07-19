import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context";
import EditAnswer from "./EditAnswer";
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AnswerCard = (props) => {

    const { login } = useContext(AppContext);
    const [editForm, setEditForm] = useState(null);
    const params = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        setEditForm(<EditAnswer id={props.answer_id} body={props.body} />);
    }

    const onClose = () => {
        setEditForm(null);
    }

    const onDelete = async (e) => {
        const response = await fetch(`/questions/${params.id}/answers/${props.answer_id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify({ id: props.answer_id })
        })
        if (response.ok) {
            toast.success('Successfully deleted your answer');
            navigate(0);
        }
    }


    return (

        <div className="answer-card-container">
            {props.isArchived === '1' ? <h2>Answer deleted by user</h2> :
                <>
                    {props.wasEdited === '1' && <p style={{ fontStyle: "italic" }}>edited at {props.edit_date.substring(0, 16).replace('T', ' ')}</p>}
                    <span>{props.user}</span>
                    <h3>{props.body}</h3>
                    <span>{props.post_date.substring(0, 16).replace('T', ' ')}</span>
                    <ThumbUpIcon onClick={() => props.onClick(1)} className="ml-30" style={{ cursor: "pointer" }} />
                    <ThumbDownIcon onClick={() => props.onClick(-1)} className="ml-10" style={{ cursor: "pointer" }} />
                    <span className="ml-10">{props.rating}</span>
                </>
            }
            {
                props.isArchived === 'false' && props.isEditable ?
                    <div style={{ display: "flex" }}>
                        {!editForm && <div><button className="btn" onClick={handleClick}>Edit answer</button></div>}
                        {editForm && <div><CloseIcon onClick={onClose} style={{ cursor: "pointer" }} /></div>}
                        {editForm}
                        <div><button className="btn" style={{ marginLeft: 20 }} onClick={onDelete}>Delete answer</button></div>
                    </div>

                    :

                    null
            }
        </div>
    );
}

export default AnswerCard;