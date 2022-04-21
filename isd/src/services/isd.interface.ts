/* eslint-disable no-unused-vars */
import {IEntityResponseBase} from '../mongo/entitybase';


export interface ISDRequest{
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    message: string;
}

export enum LeadId {
    PHONE,
    EMAIL,
    ID
}

export interface ISDInterestRequest {
    regKey: LeadId;
    regValue: string | number;
    message: string;
}

export interface ILeadResponse extends IEntityResponseBase{
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
}

export interface IInterestResponse extends IEntityResponseBase{
    leadId: number;
    message: string;
}

export interface ISDResponse extends ILeadResponse{
    id: number;
    interest: IInterestResponse;
}
