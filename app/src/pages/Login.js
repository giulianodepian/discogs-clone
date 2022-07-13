import LoginForm from "../components/LoginForm";
import { useState, useEffect } from "react";
import checkLogin from "../utils/checkLogin";
import { Navigate } from 'react-router-dom';

const Login = (props) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        checkLogin().then(logged => setIsLogged(logged))
    });

    function handleLogin() {
        setIsLogged(true);
    }

    return (
        <div className="login-div">
            {isLogged && <Navigate to="/" />}
            <LoginForm handleLogin={handleLogin} />
        </div>
    )
}

export default Login;