"use client"
import { register, signin } from "@/lib/api"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Card from "./Card"
import Button from "./Button"
import Input from "./Input"
import { SignupUser } from "@/types/auth"

const registerContent = {
    linkUrl: "/signin",
    linkText: "Already have an account?",
    header: "Create a new Account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
}

const signinContent = {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome Back",
    subheader: "Enter your credentials to access your account",
    buttonText: "Sign In",
}

const initial = { email: "", password: "", firstName: "", lastName: "" }

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
    const [formState, setFormState] = useState<SignupUser>({ ...initial })
    const [error, setError] = useState("")

    const router = useRouter()
    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                if (mode === "register") {
                    await register(formState)
                } else {
                    await signin(formState)
                }

                router.replace("/home")
            } catch (e) {
                setError(`Could not ${mode}`)
            } finally {
                setFormState({ ...initial })
            }
        },
        [formState.email, formState.password, formState.firstName, formState.lastName]
    )

    const content = mode === "register" ? registerContent : signinContent

    return (
        <Card>
            <div className="w-full">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold mb-1">{content.header}</h2>
                    <p className="text-sm text-black/25">{content.subheader}</p>
                </div>
                <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
                    {mode === "register" && (
                        <div className="flex flex-col justify-between gap-4 sm:flex-row">
                            <div className="space-y-2">
                                <label className="text-base text-black/50">First Name</label>
                                <Input
                                    required
                                    placeholder="First Name"
                                    value={formState.firstName}
                                    className="border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setFormState((s) => ({ ...s, firstName: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-black/50">Last Name</label>
                                <Input
                                    required
                                    placeholder="Last Name"
                                    value={formState.lastName}
                                    className="border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setFormState((s) => ({ ...s, lastName: e.target.value }))
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm text-black/50">Email</label>
                        <Input
                            required
                            type="email"
                            placeholder="Email"
                            value={formState.email}
                            className="border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setFormState((s) => ({ ...s, email: e.target.value }))
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-black/50">Password</label>
                        <Input
                            required
                            value={formState.password}
                            type="password"
                            placeholder="Password"
                            className="border-solid border-gray border-2 px-6 py-2 text-base rounded-3xl w-full"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setFormState((s) => ({ ...s, password: e.target.value }))
                            }
                        />
                    </div>
                    <div className="flex flex-col-reverse gap-4 sm:gap-0 sm:flex-row sm:items-center justify-between pt-6">
                        <div className="text-center">
                            <span>
                                <Link
                                    href={content.linkUrl}
                                    className="text-blue-500 font-semibold"
                                >
                                    {content.linkText}
                                </Link>
                            </span>
                        </div>
                        <div>
                            <Button className="w-full" type="submit" intent="secondary">
                                {content.buttonText}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    )
}
