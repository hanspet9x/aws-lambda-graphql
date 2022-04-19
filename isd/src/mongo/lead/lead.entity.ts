import { IModel } from "../../services/common.interface";

export interface LeadEntity extends IModel{
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
}
