import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {userState} from "@/lib/state.ts";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.getState().email) {
      navigate("/manage");
    } else {
      navigate("/login");
    }
  });
  return (<></>)
}

export default Index;
