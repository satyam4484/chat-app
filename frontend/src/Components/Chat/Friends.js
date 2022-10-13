import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getFriend } from "../../network/auth.js";
import { useGlobalContext } from "../../context.js";

const Friends = ({ friendname,openChat }) => {
  const [friend, setFriend] = useState({});
  const { token } = useGlobalContext();

  useEffect(() => {
    getFriend(friendname, token).then((response) => {
      setFriend(response.data);
    });
  }, [friendname]);

  return (
    <>
      {friend && (
        <>
          <Row onClick={() => openChat(friend)} className="justify-content-space-around mx-1 overflow-scroll mx-md-2  my-2 rounded chat_item">
            <Col md={4} className="pics">
              <img src={friend.profileImage} alt="profile" />
            </Col>
            <Col md={8} >
              <h5 className="text-center my-1">{friend.name}</h5>
              <p className="about_text">{friend.about}</p>
            </Col>
          </Row>
        
        </>
      )}
    </>
  );
};

export default Friends;
