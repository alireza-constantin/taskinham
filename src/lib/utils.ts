import bcrypt from "bcrypt"
import { SignJWT, jwtVerify } from "jose"
import { prisma } from "./db"
import { JwtUser } from "@/types/auth"
// import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10)

export const comparePasswords = (
    plainTextPassword: string,
    hashedPassword: string
): Promise<boolean> => bcrypt.compare(plainTextPassword, hashedPassword)

export const createJWT = (user: JwtUser): Promise<string> => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ user: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string): Promise<JwtUser> => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.user as JwtUser
};

export const getUserFromCookie = async (cookies: any) => {
    const jwt = cookies.get(process.env.COOKIE_NAME!)

    const { id } = await validateJWT(jwt.value)

    const user = await prisma.user.findUnique({
        where: {
            id: id as string,
        },
    })

    return user
}