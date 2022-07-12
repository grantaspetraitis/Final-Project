import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const QuestionPage = () => {

    const params = useParams();
    const [question, setQuestion] = useState(null);

    const fetchData = async () => {
        const response = await fetch(`/questions/${params.id}`);
        const json = await response.json();
        setQuestion(json);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div style={{marginTop: "500px"}}>
            {
                question ? 
                question.post_title :
                <h1>Loading</h1>
            }
        </div>    
    );
}

export default QuestionPage;