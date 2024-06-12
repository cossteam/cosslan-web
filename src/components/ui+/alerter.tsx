import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {AlertType, useAlert} from "@/components/ui+/use-alert.ts";
import {useEffect, useState} from "react";

export function Alerter() {
  const [open, setOpen] = useState(false)
  const [alertInfo, setAlertInfo] = useState<AlertType>()
  const {alerts} = useAlert()

  useEffect(() => {
    const alert = alerts.pop()
    if (alert) {
      setAlertInfo(alert)
      setOpen(true)
    }
  }, [alerts])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertInfo?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertInfo?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!alertInfo?.cancelHide && (
            <AlertDialogCancel onClick={() => {
              alertInfo?.onCancel?.()
            }}>{alertInfo?.cancelText || 'Cancel'}</AlertDialogCancel>
          )}
          {!alertInfo?.okHide && (
            <AlertDialogAction onClick={() => {
              alertInfo?.onOk?.()
            }}>{alertInfo?.okText || 'Confirm'}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
