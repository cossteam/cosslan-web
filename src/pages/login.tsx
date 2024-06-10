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
import {Label} from "@/components/ui/label"
import {ThemeToggle} from "@/components/theme-toggle";
import {LanguageToggle} from "@/components/language-toggle";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [isReg, setIsReg] = useState<boolean>(false);

  const onSubmit = () => {
    navigate("/manage");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="absolute top-4 right-4 flex justify-center items-center">
        <ThemeToggle/>
        <div className="w-3"></div>
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">
                {t('user.email')}
              </Label>
              <Input
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">
                  {t('user.password')}
                </Label>
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
              </div>
              <Input id="password" type="password" required/>
            </div>
            {isReg && (
              <div className="grid gap-2">
                <Label htmlFor="password">
                  {t('user.passwordConfirm')}
                </Label>
                <Input id="password" type="password" required/>
              </div>
            )}
            <Button type="submit" className="w-full" onClick={onSubmit}>
              {t(isReg ? 'user.register' : 'user.login')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('user.loginWithGithub')}
            </Button>
          </div>
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
