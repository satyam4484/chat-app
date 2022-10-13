import React, { useState, useEffect,useRef } from "react";

import { Row, Col, Card, Form } from "react-bootstrap";
import { getMessages,sendMessage } from "../../../network/auth";
import { useGlobalContext } from "../../../context";
const Messages = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [message,setMessage] = useState('');
  
  const { token } = useGlobalContext();
  useEffect(() => {
    getMessages(id, token).then((response) => {
      setMessages(response.data);
      
    });
    // scrollToBottom();
  }, [id]);

  const sendMessageHandler = () => {
    const data = {
        message,
        to:id
    }
    sendMessage(data,token).then(response => {
        
        let newdata = messages;
        newdata.push(response.data);
        setMessages(newdata);
    });
    setMessage('');
  }

  return (
    <>
      <Row className="msg_area">
        {messages.length > 0 &&
          messages.map((message) => {
            if (message.msg_from != id) {
              return (
                <Col
                  md={{ span: 8, offset: 4 }}
                  style={{ position: "relative" }}
                >
                  <p className="text-end p-3 my-2">{message.message}</p>
                  <span className="align_date">{message.date.slice(0, 8)}</span>
                </Col>
              );
            } else {
              return (
                <Col md={4} style={{ position: "relative" }}>
                  <p className="text-right p-3 my-2">{message.message}</p>
                  <span className="align_date">{message.date.slice(0, 8)}</span>
                </Col>
              );
            }
          })}
      </Row>
      <Row>
        <Col sm={9}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control as="textarea" rows={1} value={message} onChange={(e)=>setMessage(e.target.value)} />
          </Form.Group>
        </Col>
        <Col sm={3}> <button className="btn btn-success mx-2" onClick={sendMessageHandler}>send</button></Col>
      </Row>
    </>
  );
};

export default Messages;
