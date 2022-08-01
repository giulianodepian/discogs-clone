import SettingsForm from "../components/SettingsForm";
import { useEffect } from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import checkLogin from '../utils/checkLogin';
import './../assets/styles/settings.css';

const UserSettings = () => {

    const [isLogged, setIsLogged, user, setUser] = useOutletContext();

    useEffect(() => {
        checkLogin()
        .then(logged => {
            setIsLogged(logged);
            return fetch('http://localhost:8080/account/currentuser', {
                credentials: "include"
            })
        })
        .then(res => res.json())
        .then(data => setUser(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="settings-acc-div">
            {!isLogged && <Navigate to="/" />}
            <SettingsForm />
        </div>
    )
}

export default UserSettings;