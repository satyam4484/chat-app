import Alert from "react-bootstrap/Alert";
// import Button from 'react-bootstrap/Button';
import { useGlobalContext } from "../../context";

const AlertMessage = () => {
  const { alert, toggleAlert } = useGlobalContext();
  return (
    <Alert
      variant={alert.msgtype}
      className="text-center"
      onClose={() => toggleAlert()}
      dismissible
    >
      {/* <p className='text-center'> */}
      {alert.message}
      {/* </p> */}
    </Alert>
  );
};

export default AlertMessage;
