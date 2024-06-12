import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {userState} from "@/lib/state.ts";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userState.setState({user_id: 0})
    navigate("/login");
  });

  return null
}

export default Logout
