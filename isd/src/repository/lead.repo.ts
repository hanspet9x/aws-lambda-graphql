import {LeadEntity} from '../mongo/lead/lead.entity';
import {LeadModel} from '../mongo/lead/lead.model';

export default class LeadRepository {
  static async create(entity: LeadEntity) {
    return await LeadModel.create(entity);
  }

  static async exists(phone: string, email: string) {
    return LeadModel.exists({$or: [{email}, {phone}]});
  }

  static async getAll() {
    return LeadModel.find()
        .sort({created_at: 'desc'})
        .exec();
  }

  static async get(id: number) {
    return LeadModel.findOne({id}).lean();
  }

  static async getOneAny(key: string, value: any) {
    return LeadModel.findOne({[key]: value}).lean();
  }
}
