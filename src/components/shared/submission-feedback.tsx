interface IErrorMessageProps {
    children: string;
}

export default function SubmissionFeedback({ children }: IErrorMessageProps) {
    return (
        <div className='w-full text-base text-rose-600 bg-red-50 border border-red-600 py-2.5 text-center'>
            {children}
        </div>
    )
}