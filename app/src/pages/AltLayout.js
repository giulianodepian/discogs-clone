import { Outlet} from "react-router-dom";
import discogsLogo from '../assets/images/discogs-logo.png'
import { Link } from "react-router-dom";


const AltLayout = () => {
    return(
        <div className="wraper">
            <div className="layoutdiv">
                <div className="discogs-button">
                    <Link to='/'><img src={discogsLogo} alt="Discogs Logo"/></Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default AltLayout;