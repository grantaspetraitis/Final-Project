import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { AppContext } from "../Context";
import AddAnswer from "../components/AddAnswer";
import EditQuestion from "../components/EditQuestion";
import CloseIcon from '@mui/icons-material/Close';
import AnswerCard from "../components/AnswerCard";

const QuestionPage = () => {

    const params = useParams();
    const [question, setQuestion] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const { login } = useContext(AppContext);
    const [answers, setAnswers] = useState(null);

    const fetchData = async () => {
        const response = await fetch(`/questions/${params.id}`);
        const json = await response.json();
        setQuestion(json);
    }

    const fetchAnswers = async () => {
        const response = await fetch(`/questions/${params.id}/answers`);
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
        if(answers === null) fetchAnswers();
        
    }, [handleClick])

    const onClose = e => {
        setEditForm(null);
    }

    return (
        <div>
            <div className="single-question-container">
                {
                    question ? (
                        <>
                            <h3>{question.username}</h3>
                            <h1 className="ml-30">{question.post_title}</h1>
                            <p className="ml-30">{question.post_body}</p>
                            <div style={{ display: "flex" }}>
                                <ThumbUpIcon onClick={() => onClick(1)} className="ml-30" />
                                <ThumbDownIcon onClick={() => onClick(-1)} className="ml-10" />
                                <span className="ml-10">{question.like_amount}</span>
                            </div>
                            {login ?
                                <>
                                    {!editForm && <button className="btn" onClick={handleClick}>Edit question</button>}
                                    {editForm &&
                                        <>
                                            <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} /></>}
                                    {editForm}
                                </>
                                :
                                null
                            }
                        </>
                    ) :
                        <h1>Loading</h1>
                }
            </div>
            {
                answers ? answers.map(answer => <AnswerCard body={answer.answer_body} post_date={answer.post_date} user={answer.username} />) : <h1>Loading answers</h1>
            }
            <AddAnswer post_id={params.id} />

        </div>
    );
}

export default QuestionPage;