import ManageLayout from "@/pages/manage/_layout.tsx";
import {userState} from "@/lib/state.ts";
import {useEffect} from "react";
import {SSE} from "@/lib/sse.tsx";
import {userNotificationUnread} from "@/api/interfaces/user-notification.ts";
import utils from "@/lib/utils.ts";

const Manage = () => {
  useEffect(() => {
    userNotificationUnread().then(({data}) => {
      userState.setState({
        notification_unread: data.unread,
      })
    })

    const sse = SSE.create({
      url: `subscribe/stream?event=notification_unread&name=${utils.sessionId()}&data=${userState.getState().user_id}`,
      event: "notification_unread",
      expired: 180,
      onMessage: ({data}) => {
        userState.setState({
          notification_unread: parseInt(data),
        })
      },
    })
    return () => sse.remove()
  }, [])

  return <ManageLayout/>
}

export default Manage
