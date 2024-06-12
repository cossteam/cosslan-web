import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {userState} from "@/lib/state.ts";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    userState.setState({email: ''})
    navigate("/login");
  });

  return (<></>)
}

export default Logout
