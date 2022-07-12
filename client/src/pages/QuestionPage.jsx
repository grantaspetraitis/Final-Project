import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import toast from "react-hot-toast";
import { AppContext } from "../Context";

const QuestionPage = () => {

    const params = useParams();
    const [question, setQuestion] = useState(null);
    const { login } = useContext(AppContext);

    const fetchData = async () => {
        const response = await fetch(`/questions/${params.id}`);
        const json = await response.json();
        setQuestion(json);
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
        setQuestion(question => ({ ...question, like_amount: json}))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="question-container">
            {
                question ? (
                    <>
                        <h1 className="ml-30">{question.post_title}</h1>
                        <p className="ml-30">{question.post_body}</p>
                        <div style={{ display: "flex" }}>
                            <ThumbUpIcon onClick={() => onClick(1)} className="ml-30"/>
                            <ThumbDownIcon onClick={() => onClick(-1)} className="ml-10" />
                            <span className="ml-10">{question.like_amount}</span>
                        </div>
                    </>
                ) :
                    <h1>Loading</h1>
            }
        </div>
    );
}

export default QuestionPage;