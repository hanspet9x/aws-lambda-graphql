import { InterestEntity } from "../mongo/interests/interest.entity";
import { LeadEntity } from "../mongo/lead/lead.entity";
import { LeadModel } from "../mongo/lead/lead.model";

export default class LeadRepository {
    
    static create(entity: LeadEntity){
       LeadModel.create(entity);
    }

    static async addInterests(data: InterestEntity, leadId: number) {
        try {
            const lead = await LeadModel.findOne({id: leadId});
            if(lead) {
                lead.interests.push(data);
                lead.save();
            }
            
        } catch (error) {
            
        }
      
        
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