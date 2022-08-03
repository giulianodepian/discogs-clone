import LoginForm from "../components/LoginForm";
import { Navigate, useOutletContext } from 'react-router-dom';

const Login = (props) => {

    const [isLogged, setIsLogged] = useOutletContext();

    function handleLogin() {
        setIsLogged(true);
    }

    return (
        <div className="form-acc-div">
            {isLogged && <Navigate to="/" />}
            <LoginForm handleLogin={handleLogin} />
        </div>
    )
}

export default Login;