import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useGlobalContext } from "./context.js";
import BeforeLogin from "./Components/BeforeLogin/BeforeLogin.js";

import GetStart from "./Components/BeforeLogin/GetStart.js";
import SignUp from "./Components/BeforeLogin/SignUp.js";
import Login from "./Components/BeforeLogin/Login.js";
import Chat from "./Components/Chat/Chat.js";
import NotFound from "./Pages/NotFound.js";

const Routing = () => {
  const { loading, isLogined } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" exact element={<BeforeLogin children={<GetStart />} />} />
      {!isLogined && (
        <Route
          path="/signup"
          exact
          element={<BeforeLogin children={<SignUp />} />}
        />
      )}
      {!isLogined && (
        <Route      
          path="/login"
          exact
          element={<BeforeLogin children={<Login />} />}
        />
      )}
      {isLogined && <Route path="/chat" exact element={<Chat />} />}

      {!loading && <Route path="*" element={<NotFound />} />}
    </Routes>
  );
};

export default Routing;
