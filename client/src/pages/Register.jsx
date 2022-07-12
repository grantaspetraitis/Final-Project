import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, username, email, password, password2 } = formData;

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name: e.target.name.value,
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            }

            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            if (response.ok) {
                toast.success('Registered successfully')
                navigate('/login')
            } else {
                toast.error('Registration failed, try again')
            }
        }
    }


    return (
        <>
            <h1 style={{ textAlign: "center", color: "red", marginTop: "200px" }}>Sign up for a new account</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-element">
                    <input required className="input" type="text" value={name} placeholder="Full name" onChange={onChange} name="name" />
                </div>
                <div className="form-element">
                    <input required className="input" type="text" value={username} placeholder="Username" onChange={onChange} name="username" />
                </div>
                <div className="form-element">
                    <input required className="input" type="email" value={email} placeholder="Email address" onChange={onChange} name="email" />
                </div>
                <div className="form-element">
                    <input required className="input" type="password" value={password} placeholder="Password" onChange={onChange} name="password" />
                </div>
                <div className="form-element">
                    <input required className="input" type="password" value={password2} placeholder="Repeat password" onChange={onChange} name="password2" />
                </div>
                <button className="btn">Sign up</button>
            </form>
        </>
    );
}

export default Register;