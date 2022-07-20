import './../assets/styles/home.css'
import { useEffect } from 'react';
import checkLogin from '../utils/checkLogin';
import { useOutletContext } from 'react-router-dom';


const Home = () => {
    const [isLogged, setIsLogged, user, setUser] = useOutletContext();

    useEffect(() => {
        checkLogin()
        .then(logged => {
            setIsLogged(logged);
            return fetch('http://localhost:8080/account/user', {
                credentials: "include"
            })
        })
        .then(res => res.json())
        .then(data => setUser(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let text;

    if (isLogged) text = <p>I'm Logged</p>
    else text = <p>I'm not logged</p>

    return (
        <div className="homediv">
            <p>Home Page</p>
            {text}
        </div>
    )
}

export default Home;