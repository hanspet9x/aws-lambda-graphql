import {InterestEntity} from '../mongo/interests/interest.entity';
import {LeadEntity} from '../mongo/lead/lead.entity';
import {IInterestResponse, ILeadResponse, ISDRequest, ISDResponse} from './isd.interface';

export class LeadEntityDTO implements LeadEntity {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  id: number;
  constructor(request: ISDRequest) {
    this.id = 0;
    this.email = request.email;
    this.phone = request.phone;
    this.first_name = request.firstName;
    this.last_name = request.lastName;
  }
}


export const interestEntityToResponse = (
    entities: InterestEntity[] | InterestEntity,
):IInterestResponse[] => {
  const getEntity = (entity: InterestEntity) => ({
    leadId: entity.lead_id,
    id: entity.id,
    message: entity.message,
    createdAt: entity.created_at?.toDateString() ?? '',
    updatedAt: entity.updated_at?.toDateString() ?? '',
  });

  return Array.isArray(entities) ?
      entities.map(getEntity) :
      [getEntity(entities)];
};

export class ISDResponseDTO implements ISDResponse {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  interest: IInterestResponse;
  createdAt: string;
  updatedAt: string;

  constructor(lead: LeadEntity, interest: InterestEntity) {
    this.id = lead.id;
    this.email = lead.email;
    this.phone = lead.phone;
    this.firstName = lead.first_name;
    this.lastName = lead.last_name;
    this.interest = this.transformInterest(interest);
    this.createdAt = lead.created_at?.toLocaleString() ?? '';
    this.updatedAt = lead.updated_at?.toLocaleString() ?? '';
  }

  transformInterest(entity: InterestEntity) {
    return {
      leadId: entity.lead_id,
      id: entity.id,
      message: entity.message,
      createdAt: entity.created_at?.toLocaleString() ?? '',
      updatedAt: entity.updated_at?.toLocaleString() ?? '',
    };
  }
}

export class LeadResponseDTO implements ILeadResponse {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;

  constructor(lead: LeadEntity) {
    this.id = lead.id;
    this.email = lead.email;
    this.phone = lead.phone;
    this.firstName = lead.first_name;
    this.lastName = lead.last_name;
    this.createdAt = lead.created_at?.toLocaleString() ?? '';
    this.updatedAt = lead.updated_at?.toLocaleString() ?? '';
  }
}


export class InterestResponseDTO implements IInterestResponse {
  id: number;
  leadId: number;
  message: string;
  createdAt: string;
  updatedAt: string;

  constructor(lead: InterestEntity) {
    this.id = lead.id;
    this.leadId = lead.lead_id;
    this.message = lead.message;
    this.createdAt = lead.created_at?.toLocaleString() ?? '';
    this.updatedAt = lead.updated_at?.toLocaleString() ?? '';
  }
}
