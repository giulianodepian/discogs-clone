import { useState } from 'react';

const RegisterForm = (props) => {

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [errors, setErrors] = useState([]);
    async function handleSubmit(e) {   
        e.preventDefault();   
        var jsonAccount = {
            username: usernameValue,
            password: passwordValue,
            email: emailValue
        };
        const response = await fetch('http://localhost:8080/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonAccount),
        })
        .then(res => res.json());
        const errorsTemp = [];
        Object.keys(response).forEach((key) => {
            errorsTemp.push(response[key]);
        });
        setErrors(errorsTemp);
    }

    const errorsList = errors.map(error => {
        return(
            <li>
                {error}
            </li>
        )
    })

    return (
        <div className='registerBox'>
            <ul id='errors' className='error-list'>{errorsList}</ul>
            <form onSubmit={handleSubmit}>
                <input type="text" value={usernameValue} onChange={(e) => setUsernameValue(e.target.value)} placeholder="Username"/>
                <input type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} placeholder="Password" />
                <input type="email" value={emailValue} onChange={(e) => setEmailValue(e.target.value)} placeholder="Email"/>
                <input type="submit" value="Create Account"/>
            </form>
        </div>
    )
}

export default RegisterForm;