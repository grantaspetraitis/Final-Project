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
import toast from "react-hot-toast";

const QuestionPage = () => {

    const params = useParams();
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
                "Authorization": `Bearer ${login ? login.token : ''}`
            },
            body: JSON.stringify({ rating, id: params.id })
        })
        const json = await response.json();
        setQuestion(question => ({ ...question, like_amount: json }))
        console.log(question)
        if (!response.ok) {
            toast.error(json.error)
        }
    }

    const handleClick = e => {
        setEditForm(<EditQuestion data={question} />)
    }

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
        if (response.ok) {
            toast.success('Successfully deleted post')
            navigate('/questions')
        }
    }

    const onDelete = async (e) => {
        const response = await fetch(`/questions/${params.id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            },
            body: JSON.stringify({ id: params.id })
        })
        if (response.ok) {
            toast.success('Successfully deleted your post');
            navigate('/questions')
        }
    }

    const onAnswerLikeClick = async (rating, id) => {
        const response = await fetch(`/questions/${params.id}/rateanswer`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login ? login.token : ''}`
            },
            body: JSON.stringify({ rating, id })
        })
        const json = await response.json();
        if (!response.ok) {
            toast.error(json.error);
        } else {
            setAnswers(answers => {
                const likedAnswer = answers.find((answer) => answer.answer_id === id)
                if (likedAnswer) likedAnswer.rating = json;
                return [...answers]
            })
        }
    }

    useEffect(() => {
        fetchData();
        fetchAnswers();

    }, [])

    return (
        <div>
            <div className="single-question-container">
                {
                    question && question[0].isArchived === '1' ? <h1>Question deleted by user</h1> : question && question[0].isDeletedByAdmin === '1' ? <h1>Question deleted by admin</h1> :
                        question ? (
                            <>
                                {
                                    question[0].wasEdited === '1' && <span style={{ fontStyle: "italic" }}>edited at {question[0].edit_date.substring(0, 16).replace('T', ' ')}</span>
                                }
                                <p>{question[0].username}</p>
                                <h1 className="ml-30">{question[0].post_title}</h1>
                                <h3 className="ml-30">{question[0].post_body}</h3>
                                <div style={{ display: "flex" }}>
                                    <ThumbUpIcon onClick={() => onClick(1)} className="ml-30" style={{ cursor: "pointer" }} />
                                    <ThumbDownIcon onClick={() => onClick(-1)} className="ml-10" style={{ cursor: "pointer" }} />
                                    <span className="ml-10">{question[0].like_amount}</span>
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
                                {login &&
                                    <>
                                        {login.role === 'admin' && <button className="btn" style={{ marginLeft: 10 }} onClick={onAdminDelete}>Delete post</button>}
                                        <button className="btn" style={{ marginLeft: "20px" }} onClick={onDelete}>Delete post</button>
                                    </>
                                }
                                <span style={{ marginLeft: 20 }}>{question[0].post_date.substring(0, 16)}</span>
                            </>
                        ) :
                            <div className="spinner"></div>
                }
            </div>
            {
                answers ? answers.map((answer, i) => <AnswerCard onClick={(rating) => onAnswerLikeClick(rating, answer.answer_id)} key={i} edit_date={answer.edit_date} answer_id={answer.answer_id} body={answer.answer_body} post_date={answer.post_date} user={answer.username} id={answer.answer_id} rating={answer.rating} wasEdited={answer.wasEdited} />) : <h2 style={{ marginLeft: "100px" }}>No answers yet</h2>
            }
            <AddAnswer post_id={params.id} />

        </div>
    );
}

export default QuestionPage;