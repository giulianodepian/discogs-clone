import RegisterForm from "../components/RegisterForm";
import './../assets/styles/formaccount.css'
import { Navigate, useOutletContext } from 'react-router-dom';

const Register = () => {

    const [isLogged, setIsLogged] = useOutletContext();

    return (
        <div className="form-acc-div">
            {isLogged && <Navigate to="/" />}
            <RegisterForm />
        </div>
    )
}

export default Register;