import { Dialog, DialogContent,  DialogTrigger } from '@/components/ui/dialog';
import { ReactNode } from 'react';

type AddressModalProps = {
    trigger: string;
    children: ReactNode;
}

export default function AddressModal({trigger, children}: AddressModalProps) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
