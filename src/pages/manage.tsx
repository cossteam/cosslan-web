import ManageLayout from "@/pages/manage/_layout.tsx";
import {userState} from "@/lib/state.ts";
import {useEffect} from "react";
import {SSEClient} from "@/lib/sse.tsx";
import {userNotificationUnread} from "@/api/interfaces/user-notification.ts";
import utils from "@/lib/utils.ts";

const Manage = () => {
  useEffect(() => {
    userNotificationUnread().then(({data}) => {
      userState.setState({
        notification_unread: data.unread,
      })
    })

    const sse = new SSEClient(`subscribe/stream?event=notification_unread&name=${utils.sessionId()}&data=${userState.getState().user_id}`, {
      retry: true
    })
    sse.subscribe("notification_unread", (_, event) => {
      userState.setState({
        notification_unread: parseInt(event.data),
      })
    })
    return () => sse.unsubscribe()
  }, [])

  return <ManageLayout/>
}

export default Manage
