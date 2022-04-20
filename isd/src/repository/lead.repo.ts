import { InterestEntity } from "../mongo/interests/interest.entity";
import { LeadEntity } from "../mongo/lead/lead.entity";
import { LeadModel } from "../mongo/lead/lead.model";

export default class LeadRepository {
    
    static async create(entity: LeadEntity){
       return await LeadModel.create(entity);
    }

    static getAll(){
        return LeadModel.find()
        .sort({created_at: 'desc'})
        .exec();
    }

    static get(id: number){
        return LeadModel.findOne({id}).lean();
    }
}