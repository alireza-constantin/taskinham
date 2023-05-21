import { prisma } from "@/lib/db"
import { createJWT, hashPassword } from "@/lib/utils"
import type { User } from "@prisma/client"
import { serialize } from "cookie"

export async function POST(req: Request) {
    const body: User = await req.json()
    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: await hashPassword(body.password),
            firstName: body.firstName,
            lastName: body.lastName,
        },
    })

    const jwt = await createJWT(user)

    return new Response('', {
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
