export const metadata = {
    title: 'task manager dashboard',
    description: 'dashboard for managing your tasks',
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
