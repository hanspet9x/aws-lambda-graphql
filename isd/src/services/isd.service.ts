import {LeadEntity} from '../mongo/lead/lead.entity';
import InterestRepository from '../repository/interest.repo';
import LeadRepository from '../repository/lead.repo';
import ResponseError from '../utils/error.response';
import {ISDResponseDTO, LeadEntityDTO, LeadResponseDTO} from './isd.dto';
import {ISDInterestRequest, ISDRequest, LeadId} from './isd.interface';

export default class ISDservice {
  static async create(request: ISDRequest) {
    try {
      // transform and extract lead entity from request
      const leadEntity = new LeadEntityDTO(request);
      // check if lead exists by phone or email
      if ((await LeadRepository.exists(request.phone, request.email))) {
        // throw duplicate
        throw ResponseError.throw('duplicate data found.', 400);
      }
      // create lead
      const lead = await LeadRepository.create(leadEntity);
      // create interests if lead and message are truthy
      if (lead && request.message) {
        const interest = await InterestRepository.create(lead.id, request.message);
        // merge lead and interests together in response.
        return new ISDResponseDTO(lead, interest);
      }
      // can not create lead
      throw ResponseError.throw('Unable to create lead', 500);
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }

  static async addInterest(request: ISDInterestRequest) {
    try {
      // get search id and set correspoding text.
      const key = ISDservice.getLeadId(request.regKey);
      // find lead using the request key and value
      const lead = await LeadRepository.getOneAny(key, request.regValue);

      if (lead && lead.id) {
        // get lead id and save interest.
        const interest = await InterestRepository.create(lead.id, request.message);
        // merge lead and interests together in response.
        return new ISDResponseDTO(lead, interest);
      }
      // email or phone or id of lead doesnot exist
      throw ResponseError.throw(
          `Lead ${request.regKey} does not exist`,
          400,
      );
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }

  static async getLeads() {
    try {
      // get leads
      const leads = await LeadRepository.getAll();
      return leads.map((lead) => new LeadResponseDTO(lead));
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }

  private static getLeadId(typeId: LeadId): keyof LeadEntity {
    switch (typeId) {
      case LeadId.EMAIL:
        return 'email';
      case LeadId.PHONE:
        return 'phone';
      default:
        return 'id';
    }
  }
}
