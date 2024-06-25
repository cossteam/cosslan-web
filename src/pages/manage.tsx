import ManageLayout from "@/pages/manage/_layout.tsx";
import {userInfo} from "@/api/interfaces/user.ts";
import {userState} from "@/lib/state.ts";
import {useEffect} from "react";

const Manage = () => {
  useEffect(() => {
    userInfo().then(({data}) => {
      userState.setState(data)
    })
  }, [])

  return <ManageLayout/>
}

export default Manage
