import { Outlet} from "react-router-dom";
import './../assets/styles/layout.css'

const Layout = () => {
    return (
        <div className="wraper">
            <div className="layoutdiv">
                Layout
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;