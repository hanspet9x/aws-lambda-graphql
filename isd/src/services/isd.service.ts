import {LeadEntity} from '../mongo/lead/lead.entity';
import InterestRepository from '../repository/interest.repo';
import LeadRepository from '../repository/lead.repo';
import ResponseError from './response/error.response';
import {InterestResponseDTO, ISDResponseDTO, LeadEntityDTO, LeadResponseDTO} from './isd.dto';
import {ISDInterestRequest, ISDRequest, LeadId} from './isd.interface';

export default class ISDservice {
  /**
   * It creates lead and interests. If lead exists by phone or email it
   * creates just the interest.
   *
   * @param {ISDRequest} request The lead and interest
   * @return {ISDResponse} The lead and interest data
   */
  static async create(request: ISDRequest) {
    try {
      // transform and extract lead entity from request
      const leadEntity = new LeadEntityDTO(request);
      // find lead by phone or email
      let lead = await LeadRepository.getByPhoneAndEmail(request.phone, request.email);
      if (!lead) {
        // create lead if does not exist.
        lead = await LeadRepository.create(leadEntity);
      }
      // create interests if lead and message are truthy
      if (lead) {
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

  /**
   * It retrives all lead collection from the db and transform
   * its fields from snake_case to camelCase.
   *
   * @return {ILeadResponse[]} The lead data collection.
   */
  static async getLeads() {
    try {
      // get leads
      const leads = await LeadRepository.getAll();
      return leads.map((lead) => new LeadResponseDTO(lead));
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }

  static async getLead(leadId: number) {
    try {
      // get leads
      const lead = await LeadRepository.get(leadId);
      if (lead) {
        return new LeadResponseDTO(lead);
      }
      throw ResponseError.throw('LeadId not found', 400);
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }

  static async addInterest(request: ISDInterestRequest) {
    try {
      // get search id and set correspoding text.
      const key = request.regKey.toString().toLowerCase();
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

  static async getInterests() {
    try {
      // get leads
      const interests = await InterestRepository.getAll();
      return interests.map((interest) => new InterestResponseDTO(interest));
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }

  static async getInterest(leadId: number) {
    try {
      return await InterestRepository.getByLeadId(leadId);
    } catch (error) {
      throw ResponseError.throw(error, 500);
    }
  }
}
