import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context";

const AddAnswer = (props) => {

    const questionParams = useParams();
    const { login } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ body: '' })

    const { body } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/questions/${props.post_id}/answers`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify({ body: e.target.body.value })
        })

        const json = await response.json();
        if (response.ok) {
            toast.success('Added answer successfully')
            navigate(`/questions/${json.id}`)
        } else {
            toast.error(json.error);
        }

    }

    return (
        <>{ login ? (
            <form className="answer-form" onSubmit={onSubmit}>
                <div className="form-element">
                    <textarea cols="40" rows="10" required className="input" value={body} placeholder="Answer" onChange={onChange} name="body" />
                </div>
                <button className="btn">Post answer</button>
            </form>
        ) : (
            <h3 style={{ marginTop: 50, textAlign: "center" }}>You must be logged in to post an answer.</h3>
        ) }
            
        </>
    );
}

export default AddAnswer;