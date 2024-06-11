import {useNavigate} from "react-router-dom";
import useLocalState from "@/lib/state.ts";
import {useEffect} from "react";


const Logout = () => {
  const navigate = useNavigate();
  const [, setUser] = useLocalState('user', {});

  useEffect(() => {
    setUser({});
    navigate("/login");
  });

  return (<></>)
}

export default Logout
