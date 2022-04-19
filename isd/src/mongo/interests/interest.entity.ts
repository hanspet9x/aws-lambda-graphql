import { IModel } from "../../services/common.interface";

export interface InterestEntity extends IModel{
    lead_id: number;
    message: string;
}