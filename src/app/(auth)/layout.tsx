export const metadata = {
    title: 'Register Page',
    description: 'Signin or signup page',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>{children}</div>
    )
}
