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
import {userSettingInfo, userSettingSave} from "@/api/modules/user-setting.ts";
import {useEffect, useState} from "react";
import {userSave} from "@/api/modules/user.ts";
import {Loader2} from "lucide-react";
import {toast} from "@/components/ui/use-toast.ts";


const accountFormSchema = z.object({
  nickname: z
    .string()
    .min(2, {
      message: "Nickname must be at least 2 characters.",
    })
    .max(30, {
      message: "Nickname must not be longer than 30 characters.",
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
      nickname: userState.getState().nickname,
      email: userState.getState().email,
      invite_approval: false,
    },
  })

  async function onSubmit(data: AccountFormValues) {
    if (isLoad) {
      return
    }
    setIsLoad(true)
    await userSettingSave({
      name: "approval",
      content: {
        invite_approval: data.invite_approval ? 1 : 0
      }
    })
    await userSave({
      nickname: data.nickname
    }).then(({data}) => {
      userState.setState(Object.assign(userState.getState(), {
        nickname: data.nickname
      }))
    })
    setIsLoad(false)
    toast({
      title: "Account updated.",
      description: "success",
    })
  }

  useEffect(() => {
    userState.subscribe(
      state => [state.nickname, state.email],
      ([nickname, email]) => {
        form.setValue("nickname", nickname || "")
        form.setValue("email", email || "")
      },
      {
        fireImmediately: true,
      }
    )
    userSettingInfo({
      name: "approval"
    }).then(({data}) => {
      form.setValue("invite_approval", !!data.content.invite_approval)
    })
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nickname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input placeholder="Your nickname" {...field} />
              </FormControl>
              <FormDescription>
                This is the nickname that will be displayed on your profile.
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
