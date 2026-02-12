import AddressesLayout from "@/components/features/address/addresses-layout";
import AddressModal from "@/components/features/address/address-modal";

export default function Page() {
    return (
        <AddressModal trigger={"Open"}>
            <AddressesLayout />
        </AddressModal>
    )
}
