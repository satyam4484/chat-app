import Header from "./Header";
import Messages from "./Messages";

const ChatBox = ({friend}) => {

    return (
        <>
        <Header user={friend}/>
        <hr className="p-2" />
        <Messages id={friend.id}/>
        </>
    )
}
export default ChatBox;