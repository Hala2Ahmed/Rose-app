import AddressesLayout from "@/components/features/address/addresses-layout";
import AddressModal from "@/components/features/address/address-modal";
import { Button } from "../../../../components/ui/button";

export default function Page() {
    return (
        <AddressModal trigger={<Button className="my-7" variant="outline">Open</Button>}>
            <AddressesLayout />
        </AddressModal>
    )
}
