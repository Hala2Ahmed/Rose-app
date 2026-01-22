import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, defaultValue, LoginSchemaType } from "@/lib/schemes/login.schema";


export function useLogin() {
    const session = useSession();
    console.log("session in useLogin =", session);
    // navigation
    const route = useRouter()

    // state
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // hook
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: defaultValue,
    })
    console.log("errors", form.formState.errors);

    // handle submit
    const onSubmit = async (data: LoginSchemaType) => {
        const { email, password } = data;

        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (response?.error) {
                console.log("Login failed:", response.error);
            } else {
                console.log("Login successful!", response);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    };

    return {
        form,
        onSubmit, 
        showConfirmPassword, 
        setShowConfirmPassword
    }
}