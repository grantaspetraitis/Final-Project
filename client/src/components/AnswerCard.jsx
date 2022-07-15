import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context";
import EditAnswer from "./EditAnswer";
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from "react-router-dom";

const AnswerCard = (props) => {

    const { login } = useContext(AppContext);
    const [editForm, setEditForm] = useState(null);
    const [answer, setAnswer] = useState(null);
    const params = useParams();

    const fetchLikes = async () => {
        const response = await fetch(`/questions/${params.id}/answers`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        console.log(json)
        setAnswer(json);
        
    }

    const handleClick = () => {
        setEditForm(<EditAnswer />);
    }

    const onClose = () => {
        setEditForm(null);
    }

    const onClick = async (rating) => {
        const response = await fetch(`/questions/${params.id}/rateanswer`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify({ rating, id: props.id })
        })
        const json = await response.json();
        setAnswer(answer => ({ ...answer, like_amount: json }))
    }

    useEffect(() => {
        fetchLikes();
    }, [])

    return (
        <div className="answer-card-container">
            <span>{props.user}</span>
            <h1>{props.body}</h1>
            <span>{props.post_date.substring(0, 16).replace('T', ' ')}</span>
            <ThumbUpIcon onClick={() => onClick(1)} className="ml-30" />
            <ThumbDownIcon onClick={() => onClick(-1)} className="ml-10" />
            <span className="ml-10">{answer && answer.like_amount}</span>

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