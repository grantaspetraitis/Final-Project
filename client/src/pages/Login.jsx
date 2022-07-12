import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";
import { useContext } from "react";

const Login = () => {

    const { setLoginAndStore } = useContext(AppContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const json = await response.json();

        if(response.ok) {
            toast.success('Logged in successfully')
            navigate('/questions')
            setLoginAndStore({
                username: json.username,
                token: json.token,
                id: json.id
            })
        } else {
            toast.error(json.error);
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "red", marginTop: "200px" }}>Login to an existing account</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-element">
                    <input required className="input" type="email" value={email} placeholder="Email address" onChange={onChange} name="email" />
                </div>
                <div className="form-element">
                    <input required className="input" type="password" value={password} placeholder="Password" onChange={onChange} name="password" />
                </div>
                <button className="btn">Login</button>
            </form>
        </>
    );
}
 
export default Login;