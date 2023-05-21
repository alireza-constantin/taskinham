import { prisma } from "@/lib/db"
import { comparePasswords, createJWT, hashPassword } from "@/lib/utils"
import type { User } from "@prisma/client"
import { serialize } from "cookie"

export async function POST(req: Request) {
    const body: Pick<User, "email" | "password"> = await req.json()
    if (!body) {
        return new Response("invalid credentials", { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    })

    if (!user) {
        return new Response("invalid credentials", { status: 401 })
    }

    const isPasswordValid = await comparePasswords(body.password, user.password)

    if (!isPasswordValid) {
        return new Response("invalid credentials", { status: 401 })
    }

    const jwt = await createJWT(user)

    return new Response("", {
        status: 201,
        headers: {
            "Set-Cookie": serialize(process.env.COOKIE_NAME!, jwt, {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            }),
        },
    })
}
