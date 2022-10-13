import { useEffect } from "react";
import {NavLink,useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404 Not found page </h1>
            <NavLink className="btn btn-danger my-3" to="/">Go to Home page </NavLink>
        </div>
    )
}

export default NotFound;