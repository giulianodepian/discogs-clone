import './../assets/styles/home.css'
import { useOutletContext } from 'react-router-dom';


const Home = () => {
    const [isLogged, setIsLogged, user, setUser] = useOutletContext();

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