import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Stack,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { useGlobalContext } from "../../context";
import ChatHeader from "./ChatHeader.js";
import Friends from "./Friends";
import ChatBox from "./ChatBox/ChatBox";

const Chat = () => {
  const { user, logoutUser } = useGlobalContext();
  const [chatOpen, setChatOpen] = useState();
  const friends = user.friends;

  const seeFriendChatHandler = (friend) => {
    setChatOpen(friend);
  };

  return (
    <Container className="mt-5" fluid={"md"}>
      {/* <Col sm={12}> */}
      <Card className="my-card">
        <Card.Body>
          <Row className="justify-content-evenly">
            {/* friends list */}
            <Col sm={5}>
              {/* chat headers */}
              <ChatHeader />

              <hr className="p-2" />

              {/* user friends */}
              <Container fluid className="friendbox">
                {friends.map((friend) => (
                  <Friends
                    friendname={friend}
                    openChat={seeFriendChatHandler}
                  />
                ))}
              </Container>

              {/* user friends ends here */}
            </Col>

            {/* message of particular person */}
            <div className="vr"></div>

            <Col md={6} sm={5}>
              {chatOpen && <ChatBox friend={chatOpen}/>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* </Col> */}
    </Container>
  );
};

export default Chat;
