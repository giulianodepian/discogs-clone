import './../assets/styles/home.css'
import { useState, useEffect } from 'react';


const Home = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/account/checkuser', {
            credentials: "include"
        })
        .then( (res) => res.json())
        .then( (data) => {
            if(data.logged === true) setIsLogged(true)
        })
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