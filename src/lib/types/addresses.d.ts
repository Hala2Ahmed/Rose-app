import { ADDRESS_OPERATIONS, FORM_STEPS } from "../constants/address.constants";
import { AddressSchema} from "../schemes/address.schema";

export type Address = {
    street: string,
    phone: string,
    city: string,
    lat: string,
    long: string,
    username: string,
    _id: string,
};

export type Addresses = {
    addresses: Address[],
};

export type AddressOperations = (typeof ADDRESS_OPERATIONS)[keyof typeof ADDRESS_OPERATIONS];

export type FormSteps = (typeof FORM_STEPS)[keyof typeof FORM_STEPS];

export type AddressFields = z.infer<ReturnType<typeof AddressSchema>>;
