import { useState } from "react";
import {NavLink} from "react-router-dom";
import {Container, Row, Col, Card } from "react-bootstrap";
import GetStart from "./GetStart";
import ChatImage from "../../media/chat.png";
import SignUp from "./SignUp";

const BeforeLogin = ({ children }) => {
  const [start, setStart] = useState(0);

  const redirectLogin = (val) => {
    setStart(val);
  };
  return (
    <Container className="my-1" fluid>
    <Row className="justify-content-md-center my-md-1">
      <Col md={10}>
        <Card>
          <Card.Body>
            <Row className="justify-content-md-evenly">
              <Col md={10}>
                <h3 className="text-center fs-3 my-md-1 fw-bold text-success py-md-2">
                  Welcome to M-chat
                </h3>
              </Col>
              <Col md={5} sm={12}>
                
                {/* this will change dynamically */}
                {children}
              
              </Col>
              <div className="vr" />
              <Col md={5} sm={12} className="my-md-5">
                <img src={ChatImage} width="100%" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
  );
};

export default BeforeLogin;
