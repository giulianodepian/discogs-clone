import SettingsForm from "../components/SettingsForm";
import { useOutletContext, Navigate } from 'react-router-dom';
import './../assets/styles/settings.css';

const UserSettings = () => {

    const [isLogged, setIsLogged, user, setUser] = useOutletContext();

    return(
        <div className="settings-acc-div">
            {!isLogged && <Navigate to="/" />}
            <SettingsForm />
        </div>
    )
}

export default UserSettings;