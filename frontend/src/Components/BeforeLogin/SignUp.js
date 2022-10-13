import { Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import {NavLink,useNavigate} from "react-router-dom";
import signupReducer from "../../Reducer/signupReducer.js";
import { validateUser } from "../../network/auth.js";
import { initialSignUpState } from "../../Reducer/signupReducer.js";
import { useState, useReducer } from "react";
import {userSignup} from "../../network/auth.js";
import { useGlobalContext } from "../../context.js";

const SignUp = () => {
  const [state, dispatch] = useReducer(signupReducer, initialSignUpState);
  const [image, setImage] = useState();
  const {toggleLoading} = useGlobalContext();
  const navigate = useNavigate();
  const inputTouchedHandler = (e) => {
    dispatch({ type: "INPUT_TOUCHED", data: e.target.name });
  };

  const inputBlurHandler = (e) => {
    dispatch({
      type: "INPUT_BLUR",
      data: { key: e.target.name, value: e.target.value },
    });
    if (e.target.name === "username") {
      validateUser({ username: e.target.value, email: state.email.value })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: "VALID_DATA",
            data: { key: "username", error:data.error,value: data.message },
          });
        });
    }
    if (e.target.name === "email") {
      validateUser({ username: state.username.value, email: e.target.value })
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: "VALID_DATA",
            data: { key: "email", error:data.error,value: data.message },
          });
        });
    }
  };

  const inputChangeHandler = (e) => {
    dispatch({
      type: "ON_CHANGE",
      data: { key: e.target.name, value: e.target.value },
    });
    
  };

  const submitFormHandler = () => {
    // dispatch({type:"FORM_VALID"});
    if(state.username.hasError || state.email.hasError || state.name.hasError || state.about.hasError || state.password.hasError || image===undefined) return;

      toggleLoading();


      let form = new FormData();
      form.append("username",state.username.value);
      form.append("email",state.email.value);
      form.append("name",state.name.value);
      form.append("about",state.about.value);
      form.append("password",state.password.value);
      console.log(image);
      form.append("profileImage",image);


      userSignup(form).then(response => {
        toggleLoading();
        if(response.error) {
          return;
        }else{
          setImage();
          dispatch({type:"CLEAR"});
          navigate('/login');
        }

      })
    
  }

  const imageChangeHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <h4 className="text-center my-md-2 my-2 text-warning">Sign up Form</h4>
      <Form noValidate>
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={state.username.value}
            placeholder="Enter username"
            name="username"
            onFocus={inputTouchedHandler}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />

          {/* error if this has been taken */}
          {state.username.touched && state.username.hasError && (
            <Form.Text className="text-danger">
              {state.username.error}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={state.email.value}
            placeholder="Enter email"
            name="email"
            onFocus={inputTouchedHandler}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
          {state.email.touched && state.email.hasError && (
            <Form.Text className="text-danger">{state.email.error}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={state.name.value}
            placeholder="Enter your full name"
            name="name"
            onFocus={inputTouchedHandler}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
          {state.name.touched && state.name.hasError && (
            <Form.Text className="text-danger">{state.name.error}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>About Yourself</Form.Label>
          <Form.Control
            as="textarea"
            value={state.about.value}
            placeholder="Enter upto 500 characters"
            name="about"
            onFocus={inputTouchedHandler}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
          {state.about.touched && state.about.hasError && (
            <Form.Text className="text-danger">{state.about.error}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={state.password.value}
            placeholder="Enter your password"
            name="password"
            onFocus={inputTouchedHandler}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
          />
          {state.password.touched && state.password.hasError && (
            <Form.Text className="text-danger">
              {state.password.error}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Row className="justify-content-center">
            <Col sm={12}>
              <Form.Label>
                Profile pic <span className="mx-2"></span>
              </Form.Label>
            </Col>
            <Col sm={12}>
              <input
                type="file"
                accept="image/*"
                onChange={imageChangeHandler}
                alt="Avatar"
              />
            </Col>
            <Col sm={12}>
              {image && (
                <div className="my-2 image_container">
                  <img src={URL.createObjectURL(image)} width="100" />
                  <button className="remove_image" onClick={() => setImage('')}>
                    X
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Form.Group>

        <Button variant="success mx-1" onClick = {submitFormHandler}>Sign up</Button>
        <NavLink className="btn btn-primary mx-1" to={'/login'}>Login</NavLink>
      </Form>
    </div>
  );
};

export default SignUp;
