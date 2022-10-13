import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const GetStart = () => {

    return (
        <div className="content my-md-5">
            <p className="">All of our best apps roundups are written by humans who've spent much of their careers using, testing, and writing about software. We spend dozens of hours researching and testing apps, using each app as it's intended to be used and evaluating it against the criteria we set for the category. We're never paid for placement in our articles from any app or for links to any site—we value the trust readers put in us to offer authentic evaluations of the categories and apps we review.</p>
            <NavLink  className="btn btn-primary my-5"  to={'/signup'} >Get Started</NavLink>
        </div>
    )    
}

export default GetStart;
