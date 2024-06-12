import {Link, useNavigate} from "react-router-dom";

import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Input} from "@/components/ui/input"
import {ThemeToggle} from "@/components/theme-toggle";
import {LanguageToggle} from "@/components/language-toggle";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userState} from "@/lib/state.ts";

const Login = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [isReg, setIsReg] = useState<boolean>(false);

  const loginFormSchema = z.object({
    email: z
      .string({
        required_error: "Please enter an email.",
      })
      .email(),
    password: z
      .string({
        required_error: "Please enter a password.",
      })
      .min(6)
      .max(32),
    confirmPassword: z
      .custom<string>((val) => {
        if (!isReg) {
          return true
        }
        if (!val) {
          return false
        }
        const password: string = form.getValues('password').toString()
        return password === val
      }, 'Please enter the same password.'),
  })

  type LoginFormValues = z.infer<typeof loginFormSchema>

  const defaultValues: Partial<LoginFormValues> = {
    email: userState.getState().ext_login_email || "admin@email.com",
    password: "",
    confirmPassword: "",
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  })

  const onSubmit = (data: LoginFormValues) => {
    userState.setState({
      email: data.email,
      ext_login_email: data.email
    });
    navigate("/manage");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="absolute space-x-3 top-4 right-4 flex justify-center items-center">
        <ThemeToggle/>
        <LanguageToggle/>
      </div>
      <Card className="w-full max-w-sm max-sm:border-0">
        <CardHeader>
          <CardTitle className="text-2xl">{t(isReg ? 'user.register' : 'user.login')}</CardTitle>
          <CardDescription>
            {t(isReg ? 'user.registerDescription' : 'user.loginDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>
                      {t('user.email')}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex">
                      <div className="truncate">
                        {t('user.password')}
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger className="ml-auto inline-block text-sm underline">
                          {t('user.forgotPassword')}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t('alert.warning')}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t('user.forgotPasswordDescription')}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction>{t('alert.ok')}</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              {isReg && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex">
                        {t('user.confirmPassword')}
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" className="w-full">
                {t(isReg ? 'user.register' : 'user.login')}
              </Button>
            </form>
          </Form>
          <Button type="button" variant="outline" className="w-full mt-4">
            {t('user.loginWithGithub')}
          </Button>
          <div className="mt-4 text-center text-sm">
            {t(isReg ? 'user.alreadyHaveAccount' : 'user.dontHaveAccount')}{" "}
            <Link to="#" className="underline" onClick={() => setIsReg(!isReg)}>
              {t(isReg ? 'user.signIn' : 'user.signUp')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
