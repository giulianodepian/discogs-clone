import './../assets/styles/home.css'
import { useState, useEffect } from 'react';
import checkLogin from '../utils/checkLogin';


const Home = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        checkLogin().then(logged => setIsLogged(logged));
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