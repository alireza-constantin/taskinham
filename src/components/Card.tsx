import clsx from "clsx"

const Card = ({ className, children }: { className?: string, children: React.ReactNode }) => {
    return (
        <div className={clsx("rounded-3xl px-6 sm:px-8 py-6 drop-shadow-xl bg-white", className)}>
            {children}
        </div>
    )
}

export default Card
