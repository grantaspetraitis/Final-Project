import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context";

const EditAnswer = (props) => {

    const [formData, setFormData] = useState({ body: '' });
    const params = useParams();
    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const { body } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const answerData = { body: e.target.body.value };

        const response = await fetch(`/questions/${params.id}/answers/${props.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify({body: answerData, id: params.id, answer_id: props.id})
        })
        const json = await response.json();

        if(response.ok){
            toast.success('Edited answer successfully');
            navigate(`/questions/${params.id}`)
        } else {
            toast.error(json.error)
        }
    }

    return (
        <form className="edit-answer-form" onSubmit={onSubmit}>
            <div className="form-element">
                <textarea cols="40" rows="10" required className="input" value={body} placeholder="Edit answer" onChange={onChange} name="body" />
            </div>
            <button className="btn">Post</button>
        </form>
    );
}
 
export default EditAnswer;