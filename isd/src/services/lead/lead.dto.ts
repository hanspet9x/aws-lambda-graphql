import { ILeadModel, ILeadRequest } from "./lead.interface";

export class LeadRequestDTO implements ILeadModel{
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    
    constructor(request: ILeadRequest) {
        this.email = request.email;
        this.phone = request.phone;
        this.first_name = request.firstName;
        this.last_name = request.lastName;
    }

}

export class LeadResponseDTO implements ILeadRequest {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(request: ILeadModel) {
        this.email = request.email;
        this.phone = request.phone;
        this.firstName = request.first_name;
        this.lastName = request.last_name;
        this.createdAt = request.created_at?.toDateString();
        this.updatedAt = request.updated_at?.toDateString();
    }

}