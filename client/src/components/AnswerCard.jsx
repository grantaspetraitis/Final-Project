import { useContext, useState } from "react";
import { AppContext } from "../Context";
import EditAnswer from "./EditAnswer";
import CloseIcon from '@mui/icons-material/Close';

const AnswerCard = (props) => {

    const { login } = useContext(AppContext);
    const [editForm, setEditForm] = useState(null);

    const handleClick = () => {
        setEditForm(<EditAnswer />);
    }

    const onClose = () => {
        setEditForm(null);
    }

    return (
        <div className="answer-card-container">
            <span>{props.user}</span>
            <h1>{props.body}</h1>
            <span>{props.post_date.substring(0, 16).replace('T', ' ')}</span>

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