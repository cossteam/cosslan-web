import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {userState} from "@/lib/state.ts";
import {Switch} from "@/components/ui/switch.tsx";
import {userSettingInfo, userSettingUpdate} from "@/api/interfaces/user-setting.ts";
import {useEffect, useState} from "react";
import {userUpdate} from "@/api/interfaces/user.ts";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import utils from "@/lib/utils.ts";


const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please enter your email.",
    })
    .email(),
  invite_approval: z.boolean(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export default function AccountForm() {
  const [isLoad, setIsLoad] = useState(false)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: '',
      email: '',
      invite_approval: false,
    },
  })

  useEffect(() => {
    userState.subscribe(
      state => state,
      user => {
        form.setValue("name", user.name || "")
        form.setValue("email", user.email || "")
      },
      {
        fireImmediately: true,
      }
    )
    setIsLoad(true)
    userSettingInfo({
      name: "account"
    }).then(({data}) => {
      const content = utils.jsonParse(data.content)
      form.setValue("invite_approval", !!utils.getObject(content, 'invite_approval'))
    }).finally(() => {
      setIsLoad(false)
    })
  }, [form]);

  async function onSubmit(data: AccountFormValues) {
    if (isLoad) {
      return
    }
    setIsLoad(true)
    await userSettingUpdate({
      name: "account",
      content: utils.jsonStringify({
        invite_approval: data.invite_approval
      })
    })
    await userUpdate({
      name: data.name
    }).then(({data}) => {
      userState.setState({
        name: data.name
      })
    })
    setIsLoad(false)
    toast("Success", {
      description: "Account updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>
                Your email is your unique identity and cannot be modified.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="invite_approval"
          render={({field}) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  User Approval
                </FormLabel>
                <FormDescription>
                  Invited to join the network without human approval to join.
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
        <Button disabled={isLoad} type="submit">
          {isLoad && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          )}
          Update account
        </Button>
      </form>
    </Form>
  )
}
