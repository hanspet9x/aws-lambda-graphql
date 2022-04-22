import {InterestModel} from '../mongo/interests/interest.model';

export default class InterestRepository {
  static async create(leadId: number, message: string) {
    return InterestModel.create({lead_id: leadId, message});
  }

  static async getAll() {
    return InterestModel.find()
        .sort({created_at: 'desc'})
        .exec();
  }

  static async get(id: number) {
    return InterestModel.findOne({id}).lean();
  }

  static async getByLeadId(leadId: number) {
    return InterestModel.findOne({lead_id: leadId})
        .sort({created_at: 'desc'})
        .exec();
  }
}
