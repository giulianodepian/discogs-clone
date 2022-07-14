import { Outlet} from "react-router-dom";
import './../assets/styles/layout.css'
import discogsLogo from '../assets/images/discogs-logo.png'
import { Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    const [isLogged, setIsLogged] = useState(false) 
    function handleLogout(){
        fetch('http://localhost:8080/account/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        .then((res) => {
            if (res.status === 200) window.location.reload();
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="wraper">
            <div className="layoutdiv">
                <div className="discogs-button">
                    <Link to='/'><img src={discogsLogo} alt="Discogs Logo"/></Link>
                </div>
                <div className="account-box">
                    { !isLogged &&
                    <div className="register-button">
                        <Link to='/register'>
                            Register
                        </Link>
                    </div>
                    }
                    { !isLogged &&
                    <div className="login-button">
                        <Link to='/login'>
                            Log In
                        </Link>
                    </div>
                    }
                </div>
                { isLogged &&
                <div className="logout-button">
                    <button onClick={handleLogout}>Logout</button>
                </div>
                }
            </div>
            <Outlet context={[isLogged, setIsLogged]}/>
        </div>
    )
}

export default Layout;