import {IModel} from '../entitybase';

export interface InterestEntity extends IModel{
    lead_id: number;
    message: string;
}
