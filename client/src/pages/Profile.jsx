import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import { AppContext } from "../Context";

const Profile = () => {

    const [data, setData] = useState(null)

    const { login } = useContext(AppContext);

    const fetchData = async () => {
        const response = await fetch('/profile', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${login.token}`
            }
        })
        const json = await response.json();
        setData(json);
    }

    useEffect(() => {
        fetchData()
    })

    return (
        <>
        
            <div className="container">
                <h3 style={{ padding: "30px" }}>Your questions</h3>
                {
                    data ? data.map((data, i) => <Card key={i} data={data}></Card>) : <p>Loading</p>
                }
            </div>
        </>
    );
}

export default Profile;