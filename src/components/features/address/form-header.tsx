import { ArrowLeft } from "lucide-react";
import { FormSteps } from "../../../lib/types/addresses.js";
import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { FORM_STEPS } from "../../../lib/constants/address.constants";
import { Dispatch, SetStateAction } from "react";

type FormHeaderProps = {
    header: string;
    description: string;
    step: FormSteps;
    setStep: Dispatch<SetStateAction<FormSteps>>
}

export default function FormHeader({ step, header, description, setStep }: FormHeaderProps) {
    return (
        <DialogHeader className="flex flex-col gap-6 pb-3 border-b border-zinc-200">

            {/* Header */}
            <DialogTitle className="font-bold text-3xl leading-100 text-zinc-800">
                {header}
            </DialogTitle>

            {/*  //TODO: progress */}

            {/* Description*/}
            <DialogDescription className="flex items-center gap-4">
                {step === FORM_STEPS.LOCATION &&
                    <span
                    onClick={() => setStep(FORM_STEPS.DETAILS)}
                        className="flex flex-col items-center justify-center w-9 h-9 rounded-full bg-maroon-600 cursor-pointer"
                    >
                        <ArrowLeft color="white" size={16} />
                    </span>
                }
                <span className="font-medium text-2xl leading-100 text-maroon-600">
                    {description}
                </span>
            </DialogDescription>


        </DialogHeader>
    )
}
