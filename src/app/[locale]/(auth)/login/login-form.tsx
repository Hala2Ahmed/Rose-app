"use client";

import { Eye, EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/use-login";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
    // Hook
    const { form, onSubmit, showConfirmPassword, setShowConfirmPassword } = useLogin()

    return (
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* email */}
            <div>
                <Label>
                    Email
                </Label>

                <Controller
                    name="email"
                    control={form.control}
                    render={({ field }) => <Input {...field} placeholder="user@example.com"
                    />}
                />
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.email?.message}</p>
            </div>

            {/* password */}
            <div className="">
                <div>
                    <Label>
                        Password
                    </Label>
                    <div className="relative">

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field }) =>
                                <input
                                    {...field}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg"
                                    required
                                />}
                        />


                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.password?.message}</p>
                </div>

                <Link href="/forgot-password" className="mt-2 flex justify-end text-maroon-700 text-sm font-semibold">
                    Forgot your password?
                </Link>
            </div>

            {/* remember me */}

            <div className="flex items-center gap-2">
                <input type="checkbox" name="remember" />
                <Label className="text-zinc-800">
                    Remember Me
                </Label>
            </div>

            <Button type="submit" >Login</Button>
        </form>
    )
}

