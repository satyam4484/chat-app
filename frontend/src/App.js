import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useGlobalContext } from "./context";
import BeforeLogin from "./Components/BeforeLogin/BeforeLogin";
import { BrowserRouter as Router,useNavigate } from "react-router-dom";
import Routing from "./Routing";

import Chat from "./Components/Chat/Chat";
import Spinner from "./Components/UI/Spinner.js";
import AlertMessage from "./Components/UI/Alert";

const App = () => {
  const { loading, alert ,setUser} = useGlobalContext();

  useEffect(() => {
    let user =localStorage.getItem("user");
    if(user){
      let token= localStorage.getItem("token");
      setUser(token);
    }
    
  },[]);

  return (
    <Router>
      {alert.show && <AlertMessage />}
      {loading && <Spinner />}
      <Routing />
    </Router>
  );
};

/*

<Container className="my-1" fluid>
        
        {!isLogined && !loading && <BeforeLogin />}
        {isLogined && !loading && <Chat />}
      </Container>
*/

export default App;
