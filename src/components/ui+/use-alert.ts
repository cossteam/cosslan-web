import * as React from "react"

const TOAST_LIMIT = 100

export type AlertType = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  okText?: React.ReactNode
  cancelText?: React.ReactNode
  okHide?: boolean
  cancelHide?: boolean
  onOk?: () => void
  onCancel?: () => void
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

interface State {
  alerts: AlertType[]
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = {alerts: []}

type Alert = Omit<AlertType, "id">

function alerter({...props}: Alert) {
  const id = genId()

  memoryState = {
    ...memoryState,
    alerts: [{
      ...props,
      id,
    }, ...memoryState.alerts].slice(0, TOAST_LIMIT),
  }

  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function useAlert() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
  }
}

export {useAlert, alerter}
