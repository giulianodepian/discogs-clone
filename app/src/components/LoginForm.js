import { useState } from 'react';
//import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        var jsonCredentials = {
            username: usernameValue,
            password: passwordValue,
        };

        fetch('http://localhost:8080/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonCredentials),
            credentials: 'include',
        })
        .then((res) => {
            if (res.status === 200) props.handleLogin();
            else if (res.status === 401) console.log("Incorrect Username Or Password")
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (

        <div className="login-box">
            <form onSubmit={handleSubmit}>
                <input type="text" value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} placeholder="Username"/>
                <input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}  placeholder="password" />
                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
}

export default LoginForm;