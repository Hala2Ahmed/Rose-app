type FormHeaderProps = {
    header: string;
    description: string;
}

export default function FormHeader({header, description}: FormHeaderProps) {
    return (
        <div className="flex flex-col gap-6 pb-3 border-b border-zinc-200">
            {/* Header */}
            <span className="font-bold text-3xl leading-100 text-zinc-800">{header}</span>

            {/*  //TODO: progress */}

            {/* Description*/}
            <span className="font-medium text-2xl leading-100 text-maroon-600">{description}</span>
        </div>
    )
}
