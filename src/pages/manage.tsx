import ManageLayout from "@/pages/manage/_layout.tsx";
import {userInfo} from "@/api/interfaces/user.ts";
import {userState} from "@/lib/state.ts";
import {useEffect} from "react";
import {userNotificationUnread} from "@/api/interfaces/user-notification.ts";

const Manage = () => {
  const countdown: {
    [property: string]: any
  } = {
    timer: null,
    second: 0,
    cycle: 60,
    handler: async () => {
      countdown.timer && clearInterval(countdown.timer)
      if (countdown.second <= 0) {
        countdown.second = countdown.cycle
        await userNotificationUnread().then(({data}) => {
          userState.setState({
            notification_unread: data.unread,
          })
        })
      }
      countdown.second--
      countdown.timer = setTimeout(countdown.handler, 1000)
    }
  }

  useEffect(() => {
    userInfo().then(({data}) => {
      userState.setState(data)
    })
    countdown.handler()
  }, [])

  return <ManageLayout/>
}

export default Manage
