import { Outlet} from "react-router-dom";
import './../assets/styles/layout.css'
import discogsLogo from '../assets/images/discogs-logo.png';
import defaultUser from '../assets/images/defaultUser.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [user, setUser] = useState({}) 
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

    function handleUserMenu(e) {
        const submenu = document.getElementById("user-submenu-id");
        if (userMenuOpened) {
            submenu.style.display = "none";
            setUserMenuOpened(false);
        } else {
            submenu.style.display = "block";
            setUserMenuOpened(true);
        }
    }

    var profilePic = <img src={defaultUser} alt="Default Use" />;

    if (isLogged && user.image) {
        var binary = '';
        var bytes = new Uint8Array(user.image.data.data);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        profilePic = <img src={`data:image/${user.image.contentType};base64, ${btoa(binary)}`} alt="User Pic" />;
    }

    return (
        <div className="wraper">
            <div className="layoutdiv">
                <div className="buttonsdiv">
                    <div className="discogs-button">
                        <Link to='/'><img src={discogsLogo} alt="Discogs Logo"/></Link>
                    </div>
                    <div className="account-box">
                        { 
                            !isLogged &&
                            <div className="register-button">
                                <Link to='/register'>
                                    Register
                                </Link>
                            </div>
                        }
                        { 
                            !isLogged &&
                            <div className="login-button">
                                <Link to='/login'>
                                    Log In
                                </Link>
                            </div>
                        }
                        {
                            isLogged &&
                            <div className="user-menu" onClick={handleUserMenu}>
                                <button>{profilePic}</button>
                                <div className="user-submenu" id="user-submenu-id">
                                    <ul>
                                        <li><Link className="settings-button" to='/account/settings'>Settings</Link></li>
                                        <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Outlet context={[isLogged, setIsLogged, user, setUser]}/>
        </div>
    )
}

export default Layout;