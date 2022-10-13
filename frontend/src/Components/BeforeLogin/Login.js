import { useState } from "react";
import {NavLink,useNavigate} from "react-router-dom"
import { userLogin,getUser } from "../../network/auth";
import { Form ,Button} from "react-bootstrap";
import { useGlobalContext } from "../../context";

const Login = () => {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const {setUser,toggleAlert,toggleLoading} = useGlobalContext();


    const userLoginHandler = () => {
        toggleLoading();
        userLogin({username,password}).then(response => {
            if(response.data) {
                setUser(response.data.access);
                
                navigate('/chat');
                toggleLoading();
            }else{
                console.log("something went wrong")
            }
        }).catch(error => {
            toggleLoading();
            toggleAlert(error.response.data.detail,"danger");
        })
    }
  return (
    <div>
      <h4 className="text-center my-md-2 my-2 text-warning">Login Form</h4>
      <Form>
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button variant="warning" className="my-2" onClick={userLoginHandler}>Login</Button>
          <NavLink className="btn btn-outline-primary my-2 mx-2" to="/signup">Sign up</NavLink>

        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
