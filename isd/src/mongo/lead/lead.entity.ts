import {IModel} from '../entitybase';

export interface LeadEntity extends IModel{
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
}
