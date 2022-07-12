import { useState } from "react";
import { useEffect } from "react";
import Question from "../components/Question";

const Home = () => {

    const [questions, setQuestions] = useState(null);

    const fetchData = async () => {
        const response = await fetch('/questions')
        const json = await response.json();
        setQuestions(json);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
        <h1 style={{ marginTop: 200, padding: 10 }}>See what the community is talking about</h1>
            <div className="container">
                {
                    questions ? (
                        questions.map((question, i) => <Question key={i} data={question}></Question>)
                    ) : (
                        <h1>Loading</h1>
                    )
                }
            </div>
        </>
    );
}

export default Home;