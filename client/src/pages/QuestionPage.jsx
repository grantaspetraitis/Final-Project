import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { AppContext } from "../Context";
import AddAnswer from "../components/AddAnswer";
import EditQuestion from "../components/EditQuestion";
import CloseIcon from '@mui/icons-material/Close';
import AnswerCard from "../components/AnswerCard";
import loading from '../images/loading.gif'
import toast from "react-hot-toast";

const QuestionPage = () => {

    const params = useParams();
    const [isLoaded, setIsLoaded]= useState(false);
    const [question, setQuestion] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const { login } = useContext(AppContext);
    const [answers, setAnswers] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetch(`/questions/${params.id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setQuestion(json);
    }

    const fetchAnswers = async () => {
        const response = await fetch(`/questions/${params.id}/answers`, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setAnswers(json);
    }

    const onClick = async (rating) => {
        const response = await fetch(`/questions/${params.id}/rate`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify({ rating, id: params.id })
        })
        const json = await response.json();
        setQuestion(question => ({ ...question, like_amount: json }))
    }

    const handleClick = e => {
        setEditForm(<EditQuestion />)
    }

    useEffect(() => {
        if(question === null) fetchData();
        if(answers === null || isLoaded === false) fetchAnswers();
        setIsLoaded(true)
        
    }, [handleClick, isLoaded])

    const onClose = e => {
        setEditForm(null);
    }

    const onAdminDelete = async (e) => {
        const response = await fetch(`/questions/${params.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            }
        })
        if(response.ok){
            toast.success('Successfully deleted post')
            navigate('/questions')
        }
    }
    console.log(answers)

    return (
        <div>
            <div className="single-question-container">
                {
                    question ? (
                        <>
                            {
                                question.wasEdited === '1' && <span style={{ fontStyle: "italic" }}>edited at {question.edit_date.substring(0, 16).replace('T', ' ')}</span>
                            }
                            <h3>{question.username}</h3>
                            <h1 className="ml-30">{question.post_title}</h1>
                            <p className="ml-30">{question.post_body}</p>
                            <div style={{ display: "flex" }}>
                                <ThumbUpIcon onClick={() => onClick(1)} className="ml-30" />
                                <ThumbDownIcon onClick={() => onClick(-1)} className="ml-10" />
                                <span className="ml-10">{question.like_amount}</span>
                            </div>
                            {login &&
                                <>
                                    {!editForm && <button className="btn" onClick={handleClick}>Edit question</button>}
                                    {editForm &&
                                        <>
                                            <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} /></>}
                                    {editForm}
                                </>
                            }
                            { login &&
                                login.role === 'admin' && <button className="btn" style={{ marginLeft: 10 }} onClick={onAdminDelete}>Delete post</button>      
                            }
                            <span style={{ marginLeft: 20 }}>{question.post_date.substring(0, 16).replace('T', ' ')}</span>
                        </>
                    ) :
                        <img style={{ width: "200px",  }} src={loading} alt="loading"></img>
                }
            </div>
            {
                answers ? answers.map((answer, i) => <AnswerCard key={i} body={answer.answer_body} post_date={answer.post_date} user={answer.username} id={answer.answer_id} />) : <h1>Loading answers</h1>
            }
            <AddAnswer post_id={params.id} />

        </div>
    );
}

export default QuestionPage;