import {IModel} from '../entitybase';
import {InterestEntity} from '../interests/interest.entity';

export interface LeadEntity extends IModel{
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
}
