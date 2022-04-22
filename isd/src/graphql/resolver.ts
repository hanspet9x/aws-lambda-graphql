
import {ISDInterestRequest, ISDRequest} from '../services/isd.interface';
import ISDservice from '../services/isd.service';
import APIResponse from '../utils/api.response';

export const resolvers = {
  Query: {
    async getLeads() {
      const result = await ISDservice.getLeads();
      return result;
    },

    async getLead(_: any, args: any) {
      const result = await ISDservice.getLead(args.leadId);
      return result;
    },

    async getInterests() {
      const result = await ISDservice.getInterests();
      return result;
    },

    async getInterest(_:any, args: any ) {
      const result = await ISDservice.getInterest(args.leadId);
      return result;
    },
  },

  Mutation: {
    async addLead(_:any, args: any) {
      try {
        const result = await ISDservice.create(args.request as ISDRequest);
        return APIResponse.send(result, 'Lead added.');
      } catch (error) {
        return APIResponse.sendError(error);
      }
    },

    async addInterest(_:any, args: any) {
      try {
        const result = await ISDservice.addInterest(args.request as ISDInterestRequest);
        return APIResponse.send(result, 'Interest added.');
      } catch (error) {
        return APIResponse.sendError(error);
      }
    },
  },
};
