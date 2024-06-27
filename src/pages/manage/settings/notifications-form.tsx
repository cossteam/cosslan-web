import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import {userSettingInfo, userSettingUpdate} from "@/api/interfaces/user-setting.ts";
import {useEffect, useState} from "react";
import utils from "@/lib/utils.ts";
import {Loader2} from "lucide-react";

const notificationsFormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export default function NotificationsForm() {
  const [isLoad, setIsLoad] = useState(false)

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      marketing_emails: false,
      security_emails: false,
    },
  })

  useEffect(() => {
    setIsLoad(true)
    userSettingInfo({
      name: "notification"
    }).then(({data}) => {
      const content = utils.jsonParse(data.content)
      form.setValue("marketing_emails", !!utils.getObject(content, 'marketing_emails'))
      form.setValue("security_emails", !!utils.getObject(content, 'security_emails'))
    }).finally(() => {
      setIsLoad(false)
    })
  }, [form]);

  async function onSubmit(data: NotificationsFormValues) {
    if (isLoad) {
      return
    }
    setIsLoad(true)
    await userSettingUpdate({
      name: "notification",
      content: utils.jsonStringify({
        marketing_emails: data.marketing_emails,
        security_emails: data.security_emails,
      })
    })
    setIsLoad(false)
    toast({
      title: "Account updated.",
      description: "success",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-base font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="marketing_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="security_emails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account activity and security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={isLoad} type="submit">
          {isLoad && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          )}
          Update notifications
        </Button>
      </form>
    </Form>
  )
}
