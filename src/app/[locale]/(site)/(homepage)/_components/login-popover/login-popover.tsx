import LoginForm from "@/app/[locale]/(auth)/login/login-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "next-intl"
import Link from "next/link"


export default function LoginPopover() {
    const t = useTranslations("auth.login")

    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="login">{t("Login")}</TabsTrigger>
                <TabsTrigger value="register">
                    <Link href="/register">
                        {t("Register")}
                    </Link>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="p-5">
                <LoginForm />
            </TabsContent>
        </Tabs>
    )
}