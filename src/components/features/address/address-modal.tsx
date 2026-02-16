import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ReactElement, ReactNode } from 'react';

type AddressModalProps = {
    trigger: ReactElement;
    children: ReactNode;
}

export default function AddressModal({ trigger, children }: AddressModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='w-850 dark:bg-zinc-900'>
                {children}
            </DialogContent>
        </Dialog>
    )
}
