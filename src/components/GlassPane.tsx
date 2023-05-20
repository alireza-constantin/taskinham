import clsx from "clsx"

export default function ({
    children, className }
    : {
        children: React.ReactNode, className?: string
    }) {

    return (
        <div className={clsx("backdrop-blur-lg bg-stone-50/30 backdrop-saturate-200 rounded-2xl border-2 border-gray-200",
            className)}
        >
            {children}
        </div>
    )
}