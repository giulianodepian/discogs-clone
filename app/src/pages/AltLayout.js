import discogsLogo from '../assets/images/discogs-logo.png'
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from 'react';
import checkLogin from '../utils/checkLogin';


const AltLayout = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        checkLogin().then(logged => setIsLogged(logged)).then(() => setIsLoaded(true))
    });

        return(
            isLoaded ? (
            <div className="wraper">
                <div className="layoutdiv">
                    <div className="discogs-button">
                        <Link to='/'><img src={discogsLogo} alt="Discogs Logo"/></Link>
                    </div>
                </div>
                <Outlet context={[isLogged, setIsLogged]}/>
            </div>
            ) : 
            <div></div>
        )
}

export default AltLayout;