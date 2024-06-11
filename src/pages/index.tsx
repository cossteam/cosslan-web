import useLocalState from "@/lib/state.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Index = () => {
  const navigate = useNavigate();
  const [user] = useLocalState('user', {email: ''});

  useEffect(() => {
    if (user.email) {
      navigate("/manage");
    } else {
      navigate("/login");
    }
  });
  return (<></>)
}

export default Index;
