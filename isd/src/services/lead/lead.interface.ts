import { IModel, IModelRequest } from "../common.interface";

export interface ILeadRequest{
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    message: string;
}
