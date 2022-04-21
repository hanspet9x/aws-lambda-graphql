import {InterestEntity} from '../mongo/interests/interest.entity';
import {LeadEntity} from '../mongo/lead/lead.entity';
import {IInterestResponse, ILeadResponse, ISDRequest} from './isd.interface';

export class LeadEntityDTO implements LeadEntity {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  constructor(request: ISDRequest) {
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

export class ISDResponseDTO implements ILeadResponse {
  id?: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  interests: IInterestResponse[];
  createdAt: string;
  updatedAt: string;

  constructor(lead: LeadEntity, interests: InterestEntity[] | InterestEntity) {
    this.id = lead.id;
    this.email = lead.email;
    this.phone = lead.phone;
    this.firstName = lead.first_name;
    this.lastName = lead.last_name;
    this.interests = interestEntityToResponse(interests);
    this.createdAt = lead.created_at?.toDateString() ?? '';
    this.updatedAt = lead.updated_at?.toDateString() ?? '';
  }
}
