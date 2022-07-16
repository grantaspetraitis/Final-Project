import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";

const AddQuestion = () => {

    const navigate = useNavigate();
    const { login } = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: '',
        body: ''
    })

    const { title, body } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const questionData = {
            title: e.target.title.value,
            body: e.target.body.value
        }

        const response = await fetch('/questions', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify(questionData)
        })

        const json = await response.json();
        if (response.ok) {
            toast.success('Added question successfully');
            navigate(`/questions/${json.id}`)
        } else {
            toast.error(json.error)
        }
    }


    return (
        <form className="question-form" onSubmit={onSubmit}>
            <div className="form-element">
                <input required className="input" type="text" value={title} placeholder="Question heading" onChange={onChange} name="title" />
            </div>
            <div className="form-element">
                <textarea cols="40" rows="10" required className="input" value={body} placeholder="Question" onChange={onChange} name="body" />
            </div>
            <button className="btn">Post</button>
        </form>
    );
}

export default AddQuestion;